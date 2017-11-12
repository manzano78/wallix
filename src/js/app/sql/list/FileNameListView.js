/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import Link from '../../common/components/routing/Link'
import TableView from '../../common/components/TableView'

@inject(
    'fileNameListStore',
    'translationStore'
)
@observer
export default class FileNameListView extends Component {

    render(){

        const {fileNameListStore, translationStore} = this.props;

        const rows = fileNameListStore.fileNameList.map(fileName => ({
            fileName,
            execution: (
                <Link bsSize="xs" bsStyle="primary" to={`/sql/${fileName}`}>
                    <i className="fa fa-database"/>
                </Link>
            )
        }));

        return (
            <TableView
                rowKey="fileName"
                rows={rows}
                columns={fileNameListStore.columns}
                pageTitle={translationStore.getText('app.sql.list.title')}
                formatRowCount={(rowCount) => translationStore.getText('app.sql.list.count', rowCount)}
            />
        )
    }
}