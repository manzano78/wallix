import BaseStore from '../../common/store/BaseStore'
import {observable, runInAction, computed} from 'mobx'

export default class FileNameListStore extends BaseStore {

    @observable fileNameList;

    constructor(rootStore){
        super(rootStore);
        this.fileNameList = [];
    }

    @computed get columns(){

        return [
            {
                columnKey: 'fileName',
                columnLabel: this.rootStore.translationStore.getText('app.sql.list.column.name.title')
            },
            {
                columnKey: 'execution',
                columnLabel: this.rootStore.translationStore.getText('app.sql.list.column.execute.title')
            }
        ];
    }

    async fetchFileNameList(){
        const fileNameList = await this.rootStore.httpStore.getJSON('/api/sql/list');
        runInAction(() => this.fileNameList = fileNameList);
    }
}