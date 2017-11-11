/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import Aux from 'react-aux'
import PageTitle from '../../common/components/typography/PageTitle';
import Link from '../../common/components/routing/Link'

@inject(
    'fileNameListStore',
    'translationStore'
)
@observer
export default class FileNameListView extends Component {

    render(){

        const {fileNameListStore, translationStore} = this.props;

        return (
            <Aux>
                <PageTitle>
                    {translationStore.getText('app.sql.list.title')}
                </PageTitle>
                {fileNameListStore.fileNameList.length === 0 ? translationStore.getText('app.sql.list.no_files_found') : (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>{translationStore.getText('app.sql.list.column.name.title')}</th>
                                <th style={{width: 80}}>{translationStore.getText('app.sql.list.column.execute.title')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fileNameListStore.fileNameList.map(fileName => (
                                <tr key={fileName}>
                                    <td>{fileName}</td>
                                    <td>
                                        <Link bsSize="xs" bsStyle="primary" to={`/sql/${fileName}`}>
                                            <i className="fa fa-database"/>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Aux>
        )
    }
}