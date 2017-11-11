import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'mobx-react'
import {useStrict} from 'mobx'
import {App} from './app/App'
import RootStore from './app/common/store/RootStore'
import createBrowserHistory from 'history/createBrowserHistory'

useStrict(true);

const history = createBrowserHistory();
const rootStore = new RootStore(history);

ReactDOM.render(
    <Provider {...rootStore}>
        <App/>
    </Provider>,
    document.getElementById('app-root')
);

rootStore.routingStore.startRouter();