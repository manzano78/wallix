/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import Aux from 'react-aux'
import PageTitle from '../../common/components/typography/PageTitle';

@inject(
    'queryResultsStore',
    'translationStore'
)
@observer
export default class QueryResultsView extends Component {

    render(){

        const {queryResultsStore, translationStore, match} = this.props;
        const {fileName} = match;

        return (
            <Aux>
                <PageTitle>
                    {translationStore.getText('app.sql.query.title')}
                </PageTitle>
                <p><em>{translationStore.getText('app.sql.query.filename.desc', fileName)}</em></p>
                {queryResultsStore.queryResults.length === 0 ? translationStore.getText('app.sql.list.no_files_found') : (
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            {queryResultsStore.columns.map(column => (
                                <th key={column}>{column}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {queryResultsStore.queryResults.map(({row, rowKey}) => (
                            <tr key={rowKey}>
                                {queryResultsStore.columns.map(column => (
                                    <td key={column}>{row[column]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </Aux>
        )
    }
}