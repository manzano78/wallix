/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import {inject, observer} from 'mobx-react'

@inject('routingStore')
@observer
export default class Link extends Component {

    static propTypes = {
        to: PropTypes.string.isRequired,
        replace: PropTypes.bool
    };

    static defaultProps = {
        bsStyle: 'link'
    };

    render(){

        const {routingStore, to, ...linkProps} = this.props;

        const href = routingStore.createHref(to);

        return (
            <Button {...linkProps} href={href} onClick={e => this.handleClick(e)}/>
        );
    }

    handleClick(e){

        const {routingStore, to, replace, target, onClick} = this.props;

        if (onClick)
            onClick(e);

        if (!e.defaultPrevented && e.button === 0 && !target && !Link._isModifiedEvent(e)) {

            e.preventDefault();

            if(replace){
                routingStore.history.replace(to);
            } else {
                routingStore.history.push(to);
            }
        }
    }

    static _isModifiedEvent(e) {
        return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
    }
}