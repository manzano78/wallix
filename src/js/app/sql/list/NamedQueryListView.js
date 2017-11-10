import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import NamedQueryListStore from './NamedQueryListStore'
import TranslationStore from '../../common/store/TranslationStore'
import {Aux} from 'react-aux'

@inject(
    'namedQueryListStore',
    'translationStore'
)
@observer
export default class NamedQueryResultsView extends Component {

    static propTypes = {
        namedQueryListStore: PropTypes.instanceOf(NamedQueryListStore).isRequired,
        translationStore: PropTypes.instanceOf(TranslationStore).isRequired,
    };

    render(){

        const {namedQueryListStore, translationStore} = this.props;

        if(!namedQueryListStore.namedQueries.length)
            return translationStore.getText('sql.queries.no_queries_found');

        return (
            <Aux>
                {translationStore.getText('sql.queries.list_description')}
                <br/>
                <ul>
                    {namedQueryListStore.rowKeys.map(namedQuery => (
                        <li key={namedQuery}>{namedQuery}</li>
                    ))}
                </ul>
            </Aux>
        )
    }
}