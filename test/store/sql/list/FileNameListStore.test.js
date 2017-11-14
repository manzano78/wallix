/* eslint-disable no-undef */
import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import RootStore from '../../../../src/js/app/common/store/RootStore'
import createMemoryHistory from 'history/createMemoryHistory'
import fetchMock from 'fetch-mock'
import {toJS} from 'mobx'


let fileNameListStore;

beforeEach(() => {

    const memoryHistory = createMemoryHistory();
    const rootStore = new RootStore(memoryHistory);

    fileNameListStore = rootStore.fileNameListStore;
});

afterEach(() => {
    fetchMock.restore();
});

describe('SQL File name list Store US', () => {

    it('Should correctly fetch SQL file names from server', async () => {

        const fileNameListReceivedFromServer = ['query-1', 'query-2'];

        fetchMock.mock('/api/sql/list', {
            status: 200,
            body: fileNameListReceivedFromServer
        });

        await fileNameListStore.fetchFileNameList();

        expect(fileNameListStore.fileNameList).toEqual(fileNameListReceivedFromServer);
    });
});