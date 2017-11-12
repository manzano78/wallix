import BaseStore from '../../common/store/BaseStore'
import {observable, computed, runInAction} from 'mobx'
import {generate} from 'shortid'

export default class QueryResultsStore extends BaseStore {

    static ROW_KEY = '$$rowKey';

    @observable queryResults;

    constructor(rootStore){
        super(rootStore);
        this.queryResults = [];
    }

    @computed get columns(){

        if(!this.queryResults.length)
            return [];

        const columnKeys = Object
            .keys(this.queryResults[0])
            .filter(columnKey => columnKey !== QueryResultsStore.ROW_KEY);

        return columnKeys.map(columnKey => ({columnKey, columnLabel: columnKey}));
    }

    async fetchQueryResults(fileName){
        const queryResults = await this.rootStore.httpStore.getJSON(`/api/sql/query/${fileName}`);
        runInAction(() => this.queryResults = queryResults.map(row => ({
            ...row,
            [QueryResultsStore.ROW_KEY]: generate()
        })));
    }
}