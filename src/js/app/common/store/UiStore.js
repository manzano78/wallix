import {observable, action} from 'mobx'
import BaseStore from './BaseStore'

export default class UiStore extends BaseStore {

    @observable menuIsRetracted;

    constructor(rootStore) {
        super(rootStore);
        this.menuIsRetracted = false;
        this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
    }

    @action toggleMenuVisibility() {
        this.menuIsRetracted = !this.menuIsRetracted;
    }
}