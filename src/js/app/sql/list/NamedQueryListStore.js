import BaseStore from '../../common/store/BaseStore'
import {observable, runInAction} from 'mobx'

export default class NamedQueryListStore extends BaseStore {

    @observable namedQueries;

    constructor(rootStore){
        super(rootStore);
        this.namedQueries = [];
    }

    async fetchNamedQueries(){
        const namedQueries = await this.rootStore.httpStore.getJSON('api/sql/list');
        runInAction(() => this.namedQueries = namedQueries);
    }
}