import {computed, observable, reaction, runInAction, action} from 'mobx'
import {createLocation, createPath, locationsAreEqual} from 'history'
import Route from 'route-parser'
import {isString, isFunction} from 'is-check'
import classNames from 'classnames'
import {getRoutesDefinition, onNoRouteFound} from '../routes'
import BaseStore from './BaseStore'
import getArgNames from 'fn-args'

export default class RoutingStore extends BaseStore {

    static IS_INITIALIZING = 'IS_INITIALIZING';
    static IS_INITIALIZED = 'IS_INITIALIZED';
    static IS_IN_ERROR = 'IS_IN_ERROR';

    @observable currentView;
    @observable currentLocation;
    @observable routerIsStarted;

    constructor(rootStore, history) {
        super(rootStore);
        this.history = history;
        this.currentView = null;
        this.currentLocation = null;
        this.routerIsStarted = false;

        this.routes = getRoutesDefinition().map(routeDefinition => {

            const {pathPattern} = routeDefinition;
            const route = new Route(pathPattern);

            return {
                ...routeDefinition,
                getMatch: (path) => route.match(path)
            };
        })
    }

    @computed get currentPath() {
        return this.currentLocation ? createPath(this.currentLocation) : null;
    }

    @computed get currentRouteMatch() {

        if (this.currentPath) {

            for (let i = 0; i < this.routes.length; i++) {

                const currentRoute = this.routes[i];
                const match = currentRoute.getMatch(this.currentPath);

                if (match)
                    return {...currentRoute, match};
            }
        }

        return null;
    }

    @action startRouter() {

        if (!this.routerIsStarted) {

            this.currentLocation = this.history.location;

            this._unlistenHistoryLocationChange = this.history.listen(
                location => runInAction(() => this.currentLocation = location)
            );

            this._unlistenCurrentLocationChange = reaction(
                () => this.currentRouteMatch,
                () => this._updateCurrentView(),
                true
            );

            this.routerIsStarted = true;
        }
    }

    @action stopRouter() {

        if (this.routerIsStarted) {

            this._unlistenHistoryLocationChange();
            this._unlistenCurrentLocationChange();

            this.currentView = null;
            this.currentLocation = null;
            this.routerIsStarted = false;
        }
    }

    @action _updateCurrentView() {

        if (this.currentRouteMatch)
            return this._updateCurrentViewFromCurrentRouteMatch();

        const {redirectTo: redirectionPath, displayComponent: component} = onNoRouteFound;

        if (redirectionPath) {
            this.history.replace(redirectionPath);
        } else {
            this.currentView = {component, status: RoutingStore.IS_INITIALIZED};
        }
    }

    @action async _updateCurrentViewFromCurrentRouteMatch() {

        const {onMatch = [], component, getTitle, match} = this.currentRouteMatch;

        const functionsToExecute = isFunction(onMatch) ? [onMatch] : onMatch;
        const {results, resultsContainOneOrMorePromises} = RoutingStore._executeFunctions(functionsToExecute, match);

        if (resultsContainOneOrMorePromises) {

            this.currentView = {component, getTitle, status: RoutingStore.IS_INITIALIZING};

            let hasErrors = false;
            const originalView = this.currentView;

            await Promise.all(results).catch((error) => {
                console.log(error);
                hasErrors = true;
            });

            runInAction(() => originalView.status = hasErrors ? RoutingStore.IS_IN_ERROR : RoutingStore.IS_INITIALIZED);

        } else {
            this.currentView = {component, getTitle, status: RoutingStore.IS_INITIALIZED};
        }
    }

    currentViewStatusCase({isUndefined, isInitializing, isInitialized, isInError}) {

        if (!this.currentView)
            return isUndefined();

        switch (this.currentView.status) {
        case RoutingStore.IS_INITIALIZING:
            return isInitializing(this.currentView);
        case RoutingStore.IS_INITIALIZED:
            return isInitialized(this.currentView);
        case RoutingStore.IS_IN_ERROR:
            return isInError(this.currentView);
        }
    }

    bindLink({to, onClick, ...linkProps}) {

        const {target} = linkProps;
        const location = isString(to) ? this.createLocation(to) : to;

        return {
            ...linkProps,
            href: this.history.createHref(location),
            onClick: (e) => {

                if (onClick)
                    onClick(e);

                if (!e.defaultPrevented && e.button === 0 && !target && !RoutingStore._isModifiedEvent(e)) {

                    e.preventDefault();
                    this.history.push(location);
                }
            }
        }
    }

    bindNavLink({
                    to,
                    target,
                    onClick,
                    className: baseClassName = '',
                    activeClassName = 'active',
                    isActive: getIsActive,
                    style: baseStyle = {},
                    activeStyle = {},
                    ...linkProps
                }) {

        const location = isString(to) ? this.createLocation(to) : to;
        const isActive = getIsActive ? getIsActive() : this.currentLocation && locationsAreEqual(location, this.currentLocation);
        const className = classNames(baseClassName, {[activeClassName]: isActive});
        const style = isActive ? {...baseStyle, ...activeStyle} : baseStyle;

        return {...linkProps, ...this.bindLink({target, onClick, to: location}), className, style};
    }

    createLocation(path, state, key) {
        return createLocation(path, state, key, this.currentLocation);
    }

    static _executeFunctions(functionsToExecute, match) {

        const results = [];
        let resultsContainOneOrMorePromises = false;

        functionsToExecute.forEach(functionToExecute => {

            const argNames = getArgNames(functionToExecute);
            const args = argNames.map(argumentName => match[argumentName]);
            const result = functionToExecute.apply(undefined, args);

            results.push(result);

            if (result instanceof Promise)
                resultsContainOneOrMorePromises = true;
        });

        return {results, resultsContainOneOrMorePromises};
    }

    static _isModifiedEvent(e) {
        return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
    }
}