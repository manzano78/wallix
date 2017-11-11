/* eslint-disable react/prop-types */
import React, {Component} from 'react'
import classnames from 'classnames'
import {observer, inject} from 'mobx-react'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import {Button} from 'react-bootstrap'

@inject(
    'uiStore',
    'translationStore'
)
@observer
export default class Banner extends Component {

    render(){

        const {uiStore, translationStore} = this.props;

        const retractionTooltip = uiStore.menuIsRetracted
            ? translationStore.getText('app.menu.show')
            : translationStore.getText('app.menu.hide');

        const bannerClassName = classnames(
            'navbar',
            'navbar-fixed-top',
            {'left-margin': uiStore.menuIsRetracted}
        );

        const menuRetractionButtonClassname = classnames(
            'fa',
            {'fa-chevron-circle-left': !uiStore.menuIsRetracted},
            {'fa-bars': uiStore.menuIsRetracted}
        );

        const menuRetractionButtonTooltip = (
            <Tooltip id="menu-retraction-tooltip">
                {retractionTooltip}
            </Tooltip>
        );

        return (
            <nav id="banner" className={bannerClassName}>

                <OverlayTrigger placement="right" overlay={menuRetractionButtonTooltip}>
                    <button className="btn-toggle-menu pull-left" onClick={uiStore.toggleMenuVisibility}>
                        <i className={menuRetractionButtonClassname} aria-hidden="true"/>
                    </button>
                </OverlayTrigger>

                <ul className="nav navbar-nav navbar-right" style={{paddingRight: 12}}>
                    {translationStore.availableLanguages.map(({languageKey, languageLabel}, i) => (
                        <li key={languageKey}>
                            {i !== 0 && (
                                <span>&#124;</span>
                            )}
                            <Button
                                disabled={languageKey === translationStore.currentLanguage}
                                bsStyle="link"
                                onClick={() => translationStore.setCurrentLanguage(languageKey)}>
                                {languageLabel}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
        )
    }
}