import React from 'react'
import Menu from './Menu'
import Banner from './Banner'
import LoadingBar from './LoadingBar'
import Content from './Content'
import AppTitle from './AppTitle'
import Aux from 'react-aux'

export const App = () => (
    <Aux>
        <AppTitle/>
        <LoadingBar/>
        <div style={{minHeight: '75vh'}}>
            <Menu/>
            <Banner/>
            <Content/>
        </div>
    </Aux>
);