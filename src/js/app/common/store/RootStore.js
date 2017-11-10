import UiStore from './UiStore'
import HttpStore from './HttpStore'
import RoutingStore from './RoutingStore'
import TranslationStore from './TranslationStore'
import NamedQueryResultsStore from '../../sql/NamedQueryResultsStore'
import NamedQueryListStore from '../../sql/list/NamedQueryListStore'

export default class RootStore {

    constructor(history){
        this.uiStore = new UiStore(this);
        this.httpStore = new HttpStore(this);
        this.routingStore = new RoutingStore(this, history);
        this.translationStore = new TranslationStore(this);
        this.namedQueryResultsStore = new NamedQueryResultsStore(this);
        this.namedQueryListStore = new NamedQueryListStore(this);
    }
}