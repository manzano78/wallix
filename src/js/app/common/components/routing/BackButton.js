/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'react-bootstrap'

@inject('routingStore')
@observer
export default class BackButton extends Component {

    render(){

        const {routingStore, ...buttonProps} = this.props;

        return (
            <Button {...buttonProps} onClick={() => routingStore.history.goBack()}/>
        )
    }
}