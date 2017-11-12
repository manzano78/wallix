/* eslint-disable no-undef */
import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import RootStore from '../../../src/js/app/common/store/RootStore'
import createMemoryHistory from 'history/createMemoryHistory'
import Enzyme, {mount} from 'enzyme'
import fetchMock from 'fetch-mock'
import LogsListView from '../../../src/js/app/log/LogsListView'
import {Provider} from 'mobx-react'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

let rootStore;

beforeEach(() => {

    const memoryHistory = createMemoryHistory();
    rootStore = new RootStore(memoryHistory);
});

afterEach(() => {
    fetchMock.restore();
    rootStore.routingStore.stopRouter();
});

describe('Logs list View US', () => {

    it('Routing to /logs should correctly load view and data', async () => {

        const {routingStore, logsListStore} = rootStore;

        fetchMock.mock('/api/logs/list', {
            status: 200,
            body: []
        });

        logsListStore.fetchLogsList = jest.fn();

        routingStore.history.replace('/logs');
        routingStore.startRouter();

        expect(routingStore.currentView.component).toEqual(LogsListView);

        expect(logsListStore.fetchLogsList).toHaveBeenCalled();
    });

    it('Should correctly display logs table', async () => {

        const {logsListStore} = rootStore;

        fetchMock.mock('/api/logs/list', {
            status: 200,
            body: [
                {level: 'info', message: 'Executed SQL query : SELECT EMAIL FROM USER WHERE EMAIL LIKE \'%fake%\';', timestamp: '2017-11-12T19:30:13.935Z'},
                {level: 'info', message: 'Executed SQL query : SELECT * FROM USER WHERE AGE < 20;', timestamp: '2017-11-12T19:40:19.235Z'},
            ]
        });

        await logsListStore.fetchLogsList();

        const logsListView = mount(
            <Provider {...rootStore}>
                <LogsListView/>
            </Provider>
        );
        expect(logsListView.find('table thead tr th').length).toEqual(3);
        expect(logsListView.find('table thead tr th').at(0).text()).toEqual('Date et heure');
        expect(logsListView.find('table thead tr th').at(1).text()).toEqual('Niveau');
        expect(logsListView.find('table thead tr th').at(2).text()).toEqual('Message');

        expect(logsListView.find('table tbody tr').length).toEqual(2);
        expect(logsListView.find('table tbody tr').at(0).find('td').at(0).text()).toEqual('12/11/2017 - 20:30:13');
        expect(logsListView.find('table tbody tr').at(1).find('td').at(0).text()).toEqual('12/11/2017 - 20:40:19');
        expect(logsListView.find('table tbody tr').at(0).find('td').at(1).text()).toEqual('info');
        expect(logsListView.find('table tbody tr').at(1).find('td').at(1).text()).toEqual('info');
        expect(logsListView.find('table tbody tr').at(0).find('td').at(2).text()).toEqual('Executed SQL query : SELECT EMAIL FROM USER WHERE EMAIL LIKE \'%fake%\';');
        expect(logsListView.find('table tbody tr').at(1).find('td').at(2).text()).toEqual('Executed SQL query : SELECT * FROM USER WHERE AGE < 20;');
    });
});