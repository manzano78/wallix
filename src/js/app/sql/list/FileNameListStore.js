import BaseStore from '../../common/store/BaseStore'

export default class FileNameListStore extends BaseStore {

    constructor(rootStore){
        super(rootStore);
        this.fileNameList = [];
    }

    async fetchFileNameList(){
        this.fileNameList = await this.rootStore.httpStore.getJSON('/api/sql/list');
    }
}