/* eslint-disable react/prop-types */
import React, {Component} from 'react'

export default class PageTitle extends Component {

    render(){

        return (
            <div className="page-title">
                <h4>{this.props.children}</h4>
            </div>
        )
    }
}