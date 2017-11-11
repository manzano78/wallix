import UiStore from './UiStore'
import HttpStore from './HttpStore'
import RoutingStore from './RoutingStore'
import TranslationStore from './TranslationStore'
import QueryResultsStore from '../../sql/query/QueryResultsStore'
import FileNameListStore from '../../sql/list/FileNameListStore'

export default class RootStore {

    constructor(history){
        this.uiStore = new UiStore(this);
        this.httpStore = new HttpStore(this);
        this.translationStore = new TranslationStore(this);
        this.routingStore = new RoutingStore(this, history);
        this.fileNameListStore = new FileNameListStore(this);
        this.queryResultsStore = new QueryResultsStore(this);
    }
}