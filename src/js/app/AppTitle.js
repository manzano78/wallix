/* eslint-disable react/prop-types */
import {Component} from 'react'
import ReactDOM from 'react-dom'
import {inject, observer} from 'mobx-react'

@inject(
    'routingStore',
    'translationStore'
)
@observer
export default class AppTitle extends Component {

    render(){

        const {routingStore, translationStore} = this.props;

        const appTitle = routingStore.currentViewStatusCase({
            isUndefined: () => translationStore.getText('app.default_title'),
            isInitializing: () => translationStore.getText('app.loading_page_title'),
            isInError: () => translationStore.getText('app.error_page_title'),
            isInitialized: ({getTitle}) => getTitle()
        });

        return ReactDOM.createPortal(appTitle, document.getElementById('app-title'));
    }
}