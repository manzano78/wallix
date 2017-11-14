/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import Link from '../../common/components/routing/Link'
import Aux from 'react-aux'
import PageTitle from '../../common/components/typography/PageTitle'
import BackButton from '../../common/components/routing/BackButton'

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
                <ul>
                    {fileNameListStore.fileNameList.map(fileName => (
                        <li key={fileName} className="list-unstyled">
                            <span>
                                <i className="fa fa-database"/>
                                <Link to={`/sql/${fileName}`}>{fileName}</Link>
                            </span>
                        </li>
                    ))}
                </ul>
                <BackButton/>
            </Aux>
        )
    }
}