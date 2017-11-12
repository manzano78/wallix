/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import TableView from '../common/components/TableView'

@inject(
    'logsListStore',
    'translationStore'
)
@observer
export default class LogsListView extends Component {

    render(){

        const {logsListStore, translationStore} = this.props;

        return (
            <TableView
                rowKey="timestamp"
                rows={logsListStore.logsList}
                columns={logsListStore.columns}
                pageTitle={translationStore.getText('app.logs.list.title')}
                formatRowCount={(rowCount) => translationStore.getText('app.logs.list.count', rowCount)}
            />
        )
    }
}