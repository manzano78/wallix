import BaseStore from '../common/store/BaseStore'
import {observable, runInAction, computed} from 'mobx'
import dateformat from 'dateformat'

export default class FileNameListStore extends BaseStore {

    @observable logsList;

    constructor(rootStore){
        super(rootStore);
        this.logsList = [];
    }

    @computed get columns(){

        return [
            {
                columnKey: 'formattedDate',
                columnLabel: this.rootStore.translationStore.getText('app.logs.list.column.date.title')
            },
            {
                columnKey: 'level',
                columnLabel: this.rootStore.translationStore.getText('app.logs.list.column.level.title')
            },
            {
                columnKey: 'message',
                columnLabel: this.rootStore.translationStore.getText('app.logs.list.column.message.title')
            }
        ];
    }

    async fetchLogsList(){

        const logsList = await this.rootStore.httpStore.getJSON('/api/logs/list');

        runInAction(() => this.logsList = logsList.map(log => {
            const {timestamp} = log;
            const date = new Date(timestamp);
            const formattedDate = dateformat(date, 'dd/mm/yyyy - HH:MM:ss');
            return {...log, formattedDate};
        }));
    }
}