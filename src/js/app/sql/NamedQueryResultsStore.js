import BaseStore from '../common/store/BaseStore'
import {stringify} from 'query-string'
import {observable, computed, runInAction} from 'mobx'
import {generate} from 'shortid'

export default class NamedQueryResultsStore extends BaseStore {

    @observable rows;

    constructor(rootStore){
        super(rootStore);
        this.rows = [];
    }

    @computed get rowKeys(){
        return this.rows.length ? Object.keys(this.rows[0]) : [];
    }

    async fetchRows(namedQuery){
        const rows = await this.rootStore.httpStore.getJSON(`api/sql/get-result-set?${stringify({namedQuery})}`);
        runInAction(() => this.rows = rows.map(row => ({...row, $rowId: generate()})));
    }
}