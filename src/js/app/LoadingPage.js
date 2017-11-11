/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'

@inject('translationStore')
@observer
export default class LoadingPage extends Component {

    render(){

        const {translationStore} = this.props;

        return (
            <div style={{paddingTop: '30vh'}} className="col-md-2 col-md-offset-5 text-center">
                <i className="fa fa-cog fa-spin fa-3x fa-fw"/>
                <br/>
                <strong>{translationStore.getText('app.loading_page_status')}</strong>
            </div>
        )
    }
}