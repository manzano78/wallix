/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import {isString} from 'is-check'
import {inject, observer} from 'mobx-react'

@inject('routingStore')
@observer
export default class Link extends Component {

    static propTypes = {
        to: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]).isRequired,
        replace: PropTypes.bool
    };

    static defaultProps = {
        bsStyle: 'link'
    };

    render(){

        const {routingStore, to, ...linkProps} = this.props;

        const location = isString(to) ? routingStore.createLocation(to) : to;
        const href = routingStore.history.createHref(location);

        return (
            <Button {...linkProps} href={href} onClick={e => this.handleClick(e, location)}/>
        );
    }

    handleClick(e, location){

        const {routingStore, replace, target, onClick} = this.props;

        if (onClick)
            onClick(e);

        if (!e.defaultPrevented && e.button === 0 && !target && !Link._isModifiedEvent(e)) {

            e.preventDefault();

            if(replace){
                routingStore.history.replace(location);
            } else {
                routingStore.history.push(location);
            }
        }
    }

    static _isModifiedEvent(e) {
        return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
    }
}