import {observable, action, computed} from 'mobx'
import BaseStore from './BaseStore'

export default class TranslationStore extends BaseStore {

    static DEFAULT_LANGUAGE = 'FR';

    @observable currentLanguage;

    constructor(rootStore) {
        super(rootStore);
        this.getText = this.getText.bind(this);
        this.currentLanguage = TranslationStore.DEFAULT_LANGUAGE;
        this.textsPerLanguage = {
            FR: {
                'app.language.label.FR': 'Français',
                'app.language.label.EN': 'Anglais',
                'app.default_title': 'Test technique Wallix',
                'sql.results.no_results_found': 'La requête n\'a retourné aucun résultat.',
                'sql.queries.no_queries_found': 'Il n\'existe aucune requête à exécuter.',
                'sql.queries.list_description': 'Voici la liste des requêtes disponibles :',
                'app.sql.queries.title': 'Liste des requêtes SQL',
                'app.sql.results.title': 'Résultats de la requête SQL'
            },
            EN: {
                'app.language.label.FR': 'French',
                'app.language.label.EN': 'English',
                'app.default_title': 'Wallix\'s technical test',
                'sql.results.no_results_found': 'The query didn\'t return any result.',
                'sql.queries.no_queries_found': 'There isn\'t any query to execute.',
                'sql.queries.list_description': 'This is the list of the available queries :',
                'app.sql.queries.title': 'SQL queries list',
                'app.sql.results.title': 'SQL query\'s results'
            }
        }
    }

    @computed get texts() {
        return this.textsPerLanguage[this.currentLanguage];
    }

    @computed get availableLanguages(){
        return Object.keys(this.textsPerLanguage).map(languageKey => ({
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