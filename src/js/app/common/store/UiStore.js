import {computed, observable, action} from 'mobx'
import BaseStore from './BaseStore'

export default class UiStore extends BaseStore {

    @observable menuIsRetracted;

  constructor(rootStore) {
    super(rootStore);
    this.menuIsRetracted = false;
    this.toggleMenuVisibility = this.toggleMenuVisibility.bind(this);
  }

    @computed get displayRequirementsAreFulfilled() {

      const {routingStore, translationStore, authenticationStore} = this.rootStore;

      return translationStore.textsAreDefined
            && routingStore.routerIsStarted
            && authenticationStore.initialAuthenticationAttemptIsMade;
    }

    @action toggleMenuVisibility() {
      this.menuIsRetracted = !this.menuIsRetracted;
    }

    @action
  async fulfillDisplayRequirements() {

    const {translationStore, routingStore, authenticationStore} = this.rootStore;

    translationStore.retrieveTexts();

    await authenticationStore.attemptInitialAuthentication();

    routingStore.startRouter();
  }
}