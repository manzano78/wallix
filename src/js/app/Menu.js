/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import NavLink from './common/components/routing/NavLink'

@inject(
    'uiStore',
    'translationStore'
)
@observer
export default class Menu extends Component{

    render(){

        const {uiStore, translationStore} = this.props;

        return !uiStore.menuIsRetracted && (
            <div id="menuRetractable">
                <div>
                    <nav id="navMenuRetractable" className="navbar-gris retracte">
                        <ul id="containerMenuRetractable" className="nav">
                            <div id="sql-file-list" className="rubriques-gauche">
                                <NavLink bsClass="panel-title" to="/sql">
                                    <span className="modeRetracte span-a-cacher">
                                        {translationStore.getText('app.menu.sql_files')}
                                    </span>
                                </NavLink>
                            </div>
                            <div id="logs-list" className="rubriques-gauche">
                                <NavLink bsClass="panel-title" to="/logs">
                                    <span className="modeRetracte span-a-cacher">
                                        {translationStore.getText('app.menu.logs')}
                                    </span>
                                </NavLink>
                            </div>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}