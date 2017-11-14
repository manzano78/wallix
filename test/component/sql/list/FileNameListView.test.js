/* eslint-disable no-undef */
import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import React from 'react'
import RootStore from '../../../../src/js/app/common/store/RootStore'
import createMemoryHistory from 'history/createMemoryHistory'
import Enzyme, {mount} from 'enzyme'
import fetchMock from 'fetch-mock'
import FileNameListView from '../../../../src/js/app/sql/list/FileNameListView'
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

describe('SQL file names list View US', () => {

    it('Routing to /sql should correctly load view and data', async () => {

        const {routingStore, fileNameListStore} = rootStore;

        fetchMock.mock('/api/sql/list', {
            status: 200,
            body: []
        });

        fileNameListStore.fetchFileNameList = jest.fn();

        routingStore.history.replace('/sql');
        routingStore.startRouter();

        expect(routingStore.currentView.component).toEqual(FileNameListView);

        expect(fileNameListStore.fetchFileNameList).toHaveBeenCalled();
    });

    it('Should correctly display SQL file names table', async () => {

        const {fileNameListStore} = rootStore;

        fetchMock.mock('/api/sql/list', {
            status: 200,
            body: ['query-1', 'query-2']
        });

        await fileNameListStore.fetchFileNameList();

        const fileNameListView = mount(
            <Provider {...rootStore}>
                <FileNameListView/>
            </Provider>
        );

        expect(fileNameListView.find('ul li').length).toEqual(2);
        expect(fileNameListView.find('ul li a').at(0).text()).toEqual('query-1');
        expect(fileNameListView.find('ul li a').at(1).text()).toEqual('query-2');
        expect(fileNameListView.find('ul li a').at(0).is('[href="/sql/query-1"]')).toEqual(true);
        expect(fileNameListView.find('ul li a').at(1).is('[href="/sql/query-2"]')).toEqual(true);

    });
});