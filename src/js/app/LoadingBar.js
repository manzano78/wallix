/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import Loading from 'react-loading-bar'
import {observer, inject} from 'mobx-react'

@inject('httpStore')
@observer
export default class LoadingBar extends Component {

    render(){

        const {httpStore} = this.props;

        return (
            <Loading color="#5EB8D3" showSpinner={false} show={httpStore.isSynchronizing}/>
        )
    }
}