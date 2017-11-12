/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import TableView from '../../common/components/TableView'

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
            <TableView
                rowKey="$$rowKey"
                rows={queryResultsStore.queryResults}
                columns={queryResultsStore.columns}
                pageTitle={translationStore.getText('app.sql.query.title')}
                pageSubtitle={translationStore.getText('app.sql.query.filename.desc', fileName)}
                formatRowCount={(rowCount) => translationStore.getText('app.sql.queries.count', rowCount)}
            />
        )
    }
}