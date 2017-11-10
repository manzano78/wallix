import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import NamedQueryResultStore from './NamedQueryResultsStore'
import TranslationStore from '../common/store/TranslationStore'

@inject(
    'namedQueryResultStore',
    'translationStore'
)
@observer
export default class NamedQueryResultsView extends Component {

    static propTypes = {
        namedQueryResultStore: PropTypes.instanceOf(NamedQueryResultStore).isRequired,
        translationStore: PropTypes.instanceOf(TranslationStore).isRequired,
    };

    render(){

        const {namedQueryResultStore, translationStore} = this.props;

        if(!namedQueryResultStore.rows.length)
            return translationStore.getText('sql.results.no_results_found');

        return (
            <table>
                <thead>
                    <tr>
                        {namedQueryResultStore.rowKeys.map(rowKey => (
                            <td key={rowKey}>{rowKey}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {namedQueryResultStore.rows.map(row => (
                        <tr key={row.$rowId}>
                            {namedQueryResultStore.rowKeys.map(rowKey => (
                                <td key={rowKey}>{row[rowKey]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}