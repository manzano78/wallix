import {observable, runInAction, computed} from 'mobx'
import BaseStore from './BaseStore'
import fetch from 'isomorphic-fetch'
import {stringify} from 'query-string'

export default class HttpStore extends BaseStore {

    static FETCH_CONFIG = {
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json'
        }
    };

    @observable pendingRequestCount;

    constructor(rootStore){
        super(rootStore);
        this.pendingRequestCount = 0;
    }

    @computed get isSynchronizing(){
        return this.pendingRequestCount !== 0;
    }

    async getJSON(url, params){

        this.pendingRequestCount++;

        const finalUrl = params ? `${url}?${stringify(params)}` : url;

        const data = await fetch(finalUrl, HttpStore.FETCH_CONFIG)
            .then(response => response.json());

        runInAction(() => this.pendingRequestCount--);

        return data;
    }
}