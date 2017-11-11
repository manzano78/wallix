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
                'app.sql.query.no_results_found': 'La requête n\'a retourné aucun résultat.',
                'app.sql.list.no_files_found': 'Il n\'existe aucune requête à exécuter.',
                'app.sql.list.title': 'Liste des fichiers SQL',
                'app.sql.query.title': 'Résultats de la requête SQL',
                'app.sql.query.filename.desc': 'Nom du fichier SQL : {0}',
                'app.sql.list.column.name.title': 'Nom du fichier SQL',
                'app.sql.list.column.execute.title': 'Exécuter',
                'app.error_page_title': 'Une erreur est survenue',
                'app.error_page_status': 'Une erreur est survenue, veuillez contacter un administrateur.',
                'app.loading_page_title': 'Chargement en cours...',
                'app.loading_page_status': 'Chargement en cours...',
                'app.menu.hide': 'Masquer le menu',
                'app.menu.show': 'Afficher le menu'
            },
            EN: {
                'app.language.label.FR': 'French',
                'app.language.label.EN': 'English',
                'app.default_title': 'Wallix\'s technical test',
                'app.sql.query.no_results_found': 'The query didn\'t return any result.',
                'app.sql.list.no_files_found': 'There isn\'t any query to execute.',
                'app.sql.list.title': 'SQL queries list',
                'app.sql.query.title': 'SQL query\'s results',
                'app.sql.query.filename.desc': 'SQL file name : {0}',
                'app.error_page_title': 'An error occurred',
                'app.error_page_status': 'An error occurred, please contact an administrator.',
                'app.loading_page_title': 'Loading...',
                'app.loading_page_status': 'Loading...',
                'app.menu.hide': 'Hide menu',
                'app.menu.show': 'Show menu',
                'app.sql.list.column.name.title': 'SQL File name',
                'app.sql.list.column.execute.title': 'Execute'
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