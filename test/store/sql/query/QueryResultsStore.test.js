/* eslint-disable no-undef */
import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import RootStore from '../../../../src/js/app/common/store/RootStore'
import createMemoryHistory from 'history/createMemoryHistory'
import fetchMock from 'fetch-mock'
import {toJS} from 'mobx'


let queryResultsStore;

beforeEach(() => {

    const memoryHistory = createMemoryHistory();
    const rootStore = new RootStore(memoryHistory);

    queryResultsStore = rootStore.queryResultsStore;
});

afterEach(() => {
    fetchMock.restore();
});

describe('Query results Store US', () => {

    it('Should correctly fetch SQL query results from server', async () => {

        const queryResultsReceivedFromServer = [
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
        ];

        fetchMock.mock('/api/sql/query/test-query', {
            status: 200,
            body: queryResultsReceivedFromServer
        });

        await queryResultsStore.fetchQueryResults('test-query');

        const queryResults = toJS(queryResultsStore.queryResults);

        expect(queryResults[0].id).toEqual(1);
        expect(queryResults[0].country).toEqual('France');
        expect(queryResults[0].language).toEqual('French');
        expect(queryResults[0].$$rowKey).toBeDefined();
        expect(queryResults[1].id).toEqual(2);
        expect(queryResults[1].country).toEqual('Spain');
        expect(queryResults[1].language).toEqual('Spanish');
        expect(queryResults[1].$$rowKey).toBeDefined();

        expect(queryResultsStore.columns).toEqual([
            {
                columnKey: 'id',
                columnLabel: 'id',
            },
            {
                columnKey: 'country',
                columnLabel: 'country'
            },
            {
                columnKey: 'language',
                columnLabel: 'language'
            }
        ]);
    });
});