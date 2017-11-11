import BaseStore from '../../common/store/BaseStore'
import {observable, computed, runInAction} from 'mobx'
import {generate} from 'shortid'

export default class QueryResultsStore extends BaseStore {

    @observable queryResults;

    constructor(rootStore){
        super(rootStore);
        this.queryResults = [];
    }

    @computed get columns(){
        return this.queryResults.length ? Object.keys(this.queryResults[0].row) : [];
    }

    async fetchRows(fileName){
        const rows = await this.rootStore.httpStore.getJSON(`/api/sql/query/${fileName}`);
        runInAction(() => this.queryResults = rows.map(row => ({row, rowKey: generate()})));
    }
}