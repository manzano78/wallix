import {observable, action, computed} from 'mobx'
import BaseStore from './BaseStore'

export default class TranslationStore extends BaseStore {

    static DEFAULT_LANGUAGE = 'fr';

    @observable currentLanguage;

    constructor(rootStore) {
        super(rootStore);
        this.getText = this.getText.bind(this);
        this.currentLanguage = TranslationStore.DEFAULT_LANGUAGE;
        this.textsPerLanguage = {
            fr: {
                'app.language.label.fr': 'Français',
                'app.language.label.en': 'Anglais',
                'app.default_title': 'Test technique Wallix',
                'app.logs.list.title': 'Journal',
                'app.logs.list.no_logs_found': 'Aucun évenement n\'a été journalisé.',
                'app.logs.list.column.date.title': 'Date et heure',
                'app.logs.list.column.level.title': 'Niveau',
                'app.logs.list.column.message.title': 'Message',
                'app.logs.list.count': 'Total : {0} évènement(s) journalisé(s)',
                'app.sql.list.count': 'Total : {0} fichier(s) SQL',
                'app.sql.query.no_results_found': 'La requête n\'a retourné aucun résultat.',
                'app.sql.list.no_files_found': 'Il n\'existe aucune requête à exécuter.',
                'app.sql.queries.count': 'La requête a retourné {0} enregistrement(s).',
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
                'app.menu.show': 'Afficher le menu',
                'app.go_back': 'Retour',
                'app.menu.sql_files': 'Fichiers SQL',
                'app.menu.logs': 'Journal'
            },
            en: {
                'app.language.label.fr': 'French',
                'app.language.label.en': 'English',
                'app.default_title': 'Wallix\'s technical test',
                'app.logs.list.title': 'Logs',
                'app.logs.list.no_logs_found': 'No event has been logged.',
                'app.logs.list.column.date.title': 'Date and time',
                'app.logs.list.column.level.title': 'Level',
                'app.logs.list.column.message.title': 'Message',
                'app.logs.list.count': 'Total : {0} logged event(s)',
                'app.sql.list.count': 'Total : {0} SQL file(s)',
                'app.sql.query.no_results_found': 'The query didn\'t return any result.',
                'app.sql.queries.count': 'The query returned {0} record(s).',
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
                'app.sql.list.column.execute.title': 'Execute',
                'app.go_back': 'Go back',
                'app.menu.sql_files': 'SQL Files',
                'app.menu.logs': 'Logs'
            }
        };
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