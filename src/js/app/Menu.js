/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'

@inject('uiStore')
@observer
export default class Menu extends Component{

    render(){

        return !this.props.uiStore.menuIsRetracted && (
            <div id="menu-retractable">

            </div>
        )
    }
}
