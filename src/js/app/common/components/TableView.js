import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'
import Aux from 'react-aux'
import PageTitle from './typography/PageTitle';
import BackButton from './routing/BackButton'

export default class TableView extends Component {

    static propTypes = {
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                columnKey: PropTypes.string.isRequired,
                columnLabel: PropTypes.string.isRequired
            })
        ).isRequired,
        rows: PropTypes.oneOfType([
            MobxPropTypes.observableArrayOf(PropTypes.object),
            PropTypes.arrayOf(PropTypes.object)
        ]).isRequired,
        rowKey: PropTypes.string.isRequired,
        pageTitle: PropTypes.string.isRequired,
        pageSubtitle: PropTypes.string,
        formatRowCount: PropTypes.func.isRequired
    };

    render(){

        const {
            pageTitle,
            rows,
            rowKey,
            columns,
            pageSubtitle,
            formatRowCount
        } = this.props;

        return (
            <Aux>
                <PageTitle>{pageTitle}</PageTitle>
                {pageSubtitle && (
                    <p>
                        <em>{pageSubtitle}</em>
                    </p>
                )}
                {rows.length !== 0 && (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {columns.map(({columnKey, columnLabel}) => (
                                    <th key={columnKey}>{columnLabel}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                        {rows.map(row => (
                            <tr key={row[rowKey]}>
                                {columns.map(({columnKey}) => (
                                    <td key={columnKey}>{row[columnKey]}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                <p>{formatRowCount(rows.length)}</p>
                <BackButton/>
            </Aux>
        )
    }
}