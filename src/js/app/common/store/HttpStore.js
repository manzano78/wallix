import {observable, runInAction, computed, action} from 'mobx'
import BaseStore from './BaseStore'
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
        this._handleResponseError = this._handleResponseError.bind(this);
    }

    @computed get isSynchronizing(){
        return this.pendingRequestCount !== 0;
    }

    @action async getJSON(url, params){

        this.pendingRequestCount++;

        const finalUrl = params ? `${url}?${stringify(params)}` : url + 't';

        const response = await fetch(finalUrl, HttpStore.FETCH_CONFIG).catch(this._handleResponseError);
        const responseBody = await response.json().catch(this._handleResponseError);

        this._decrementRequestCount();

        return responseBody;
    }

    _handleResponseError(error){
        this._decrementRequestCount();
        throw error;
    }

    @action _decrementRequestCount(){
        this.pendingRequestCount--;
    }
}