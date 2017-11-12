/* eslint-disable no-undef */
import 'raf/polyfill'
import 'babel-polyfill'
import 'isomorphic-fetch'
import RootStore from '../../../src/js/app/common/store/RootStore'
import createMemoryHistory from 'history/createMemoryHistory'
import fetchMock from 'fetch-mock'
import {toJS} from 'mobx'


let logsListStore;

beforeEach(() => {

    const memoryHistory = createMemoryHistory();
    const rootStore = new RootStore(memoryHistory);

    logsListStore = rootStore.logsListStore;
});

afterEach(() => {
    fetchMock.restore();
});

describe('Logs list Store US', () => {

    it('Should correctly fetch logs from server', async () => {

        const logsListReceivedFromServer = [
            {level: 'info', message: 'Executed SQL query : SELECT EMAIL FROM USER WHERE EMAIL LIKE \'%fake%\';', timestamp: '2017-11-12T19:30:13.935Z'},
            {level: 'info', message: 'Executed SQL query : SELECT * FROM USER WHERE AGE < 20;', timestamp: '2017-11-12T19:40:19.235Z'},
        ];

        const expectedLogList = [
            {formattedDate: '12/11/2017 - 20:30:13', level: 'info', message: 'Executed SQL query : SELECT EMAIL FROM USER WHERE EMAIL LIKE \'%fake%\';', timestamp: '2017-11-12T19:30:13.935Z'},
            {formattedDate: '12/11/2017 - 20:40:19', level: 'info', message: 'Executed SQL query : SELECT * FROM USER WHERE AGE < 20;', timestamp: '2017-11-12T19:40:19.235Z'},
        ];

        fetchMock.mock('/api/logs/list', {
            status: 200,
            body: logsListReceivedFromServer
        });

        await logsListStore.fetchLogsList();

        const logsList = toJS(logsListStore.logsList);

        expect(logsList).toEqual(expectedLogList);

        expect(logsListStore.columns).toEqual([
            {
                columnKey: 'formattedDate',
                columnLabel: 'Date et heure'
            },
            {
                columnKey: 'level',
                columnLabel: 'Niveau'
            },
            {
                columnKey: 'message',
                columnLabel: 'Message'
            }
        ]);
    });
});