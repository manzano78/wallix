/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from './Link'
import {inject, observer} from 'mobx-react'
import classNames from 'classnames'

@inject('routingStore')
@observer
export default class NavLink extends Component {

    static propTypes = {
        activeClassName: PropTypes.string.isRequired,
        activeStyle: PropTypes.object.isRequired,
        getIsActive: PropTypes.func
    };

    static defaultProps = {
        activeClassName: 'active',
        activeStyle: {},
        style: {}
    };

    render(){

        const {
            routingStore,
            to,
            getIsActive,
            activeClassName,
            className: baseClassName,
            activeStyle,
            style: baseStyle,
            ...linkProps
        } = this.props;

        const match = !!(routingStore.currentRouteMatch && routingStore.currentRouteMatch.getMatch(to));

        const isActive = getIsActive ? getIsActive() : match;

        const className = classNames(baseClassName, {[activeClassName]: isActive});

        const style = isActive ? {...baseStyle, ...activeStyle} : baseStyle;

        return (
            <Link {...linkProps} to={to} className={className} style={style}/>
        );
    }
}