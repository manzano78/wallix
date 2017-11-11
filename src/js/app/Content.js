/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import classnames from 'classnames'
import LoadingPage from './LoadingPage'
import ErrorPage from './ErrorPage'

@inject(
    'uiStore',
    'routingStore'
)
@observer
export default class Content extends Component {

    render() {

        const {uiStore, routingStore} = this.props;

        const className = classnames({
            'left-margin': uiStore.menuIsRetracted
        });

        return (
            <div id="content" className={className}>
                {routingStore.currentViewStatusCase({
                    isUndefined: () => null,
                    isInitializing: () => <LoadingPage/>,
                    isInError: () => <ErrorPage/>,
                    isInitialized: ({component: Component, match}) => <Component match={match}/>
                })}
            </div>
        )
    }
}