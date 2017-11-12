/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import {Button} from 'react-bootstrap'

@inject(
    'routingStore',
    'translationStore',
)
@observer
export default class BackButton extends Component {

    render(){

        const {routingStore, translationStore, ...buttonProps} = this.props;

        return (
            <Button {...buttonProps} onClick={() => routingStore.history.goBack()}>
                <i className="fa fa-caret-left"/> {translationStore.getText('app.go_back')}
            </Button>
        )
    }
}