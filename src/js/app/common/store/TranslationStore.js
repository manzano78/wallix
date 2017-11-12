import {observable, action, computed} from 'mobx'
import BaseStore from './BaseStore'
import {texts} from '../texts'

export default class TranslationStore extends BaseStore {

    static DEFAULT_LANGUAGE = 'fr';

    @observable currentLanguage;

    constructor(rootStore) {
        super(rootStore);
        this.getText = this.getText.bind(this);
        this.currentLanguage = TranslationStore.DEFAULT_LANGUAGE;
    }

    @computed get texts() {
        return texts[this.currentLanguage];
    }

    @computed get availableLanguages(){
        return Object.keys(texts).map(languageKey => ({
            languageKey,
            languageLabel: this.getText(`app.language.label.${languageKey}`)
        }));
    }

    @action setCurrentLanguage(currentLanguage) {
        this.currentLanguage = currentLanguage;
    }

    getText(key, ...parameters) {

        if (this.texts) {

            let text = this.texts[key];

            if (text) {

                if (parameters.length) {

                    parameters.forEach((parameter, i) => {
                        text = text.replace(`{${i}}`, parameter);
                    });
                }

                return text;
            }
        }

        return key;
    }
}