/* eslint-disable no-undef */
import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import RootStore from '../../../../src/js/app/common/store/RootStore'
import createMemoryHistory from 'history/createMemoryHistory'
import Enzyme, {mount} from 'enzyme'
import fetchMock from 'fetch-mock'
import QueryResultsView from '../../../../src/js/app/sql/query/QueryResultsView'
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

describe('SQL query result View US', () => {

    it('Routing to /sql/< filename > should correctly load view and data', async () => {

        const {routingStore, queryResultsStore} = rootStore;

        fetchMock.mock('/api/sql/query/test-query', {
            status: 200,
            body: []
        });

        queryResultsStore.fetchQueryResults = jest.fn();

        routingStore.history.replace('/sql/test-query');
        routingStore.startRouter();

        expect(routingStore.currentView.component).toEqual(QueryResultsView);

        expect(queryResultsStore.fetchQueryResults).toHaveBeenCalledWith('test-query');
    });

    it('Should correctly display SQL query results table', async () => {

        const {queryResultsStore} = rootStore;

        fetchMock.mock('/api/sql/query/test-query', {
            status: 200,
            body: [
                {
                    id: 1,
                    country: 'France',
                    language: 'French'
                },
                {
                    id: 2,
                    country: 'Spain',
                    language: 'Spanish'
                }
            ]
        });

        await queryResultsStore.fetchQueryResults('test-query');

        const queryResultsView = mount(
            <Provider {...rootStore}>
                <QueryResultsView match={{filename: 'test-query'}}/>
            </Provider>
        );
        expect(queryResultsView.find('table thead tr th').length).toEqual(3);
        expect(queryResultsView.find('table thead tr th').at(0).text()).toEqual('id');
        expect(queryResultsView.find('table thead tr th').at(1).text()).toEqual('country');
        expect(queryResultsView.find('table thead tr th').at(2).text()).toEqual('language');

        expect(queryResultsView.find('table tbody tr').length).toEqual(2);
        expect(queryResultsView.find('table tbody tr').at(0).find('td').at(0).text()).toEqual('1');
        expect(queryResultsView.find('table tbody tr').at(1).find('td').at(0).text()).toEqual('2');
        expect(queryResultsView.find('table tbody tr').at(0).find('td').at(1).text()).toEqual('France');
        expect(queryResultsView.find('table tbody tr').at(1).find('td').at(1).text()).toEqual('Spain');
        expect(queryResultsView.find('table tbody tr').at(0).find('td').at(2).text()).toEqual('French');
        expect(queryResultsView.find('table tbody tr').at(1).find('td').at(2).text()).toEqual('Spanish');
    });
});