import BaseStore from '../../common/store/BaseStore'
import {observable, runInAction} from 'mobx'

export default class FileNameListStore extends BaseStore {

    @observable fileNameList;

    constructor(rootStore){
        super(rootStore);
        this.fileNameList = [];
    }

    async fetchFileNameList(){
        const fileNameList = await this.rootStore.httpStore.getJSON('/api/sql/list');
        runInAction(() => this.fileNameList = fileNameList);
    }
}