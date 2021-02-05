import React, {createContext} from 'react';
import {useImmerReducer} from 'use-immer';
import {Table, Row, Col, Divider} from 'antd';

import 'antd/dist/antd.css';
import './App.css';

import {AddComponentForm} from './components/Form/AddAutoCompleteForm.component';
import {stateReducer} from './functions/stateReducer.js';

import {FORM_COLUMNS} from './constants/FORM_COLUMNS';
import {AddProduct} from "./components/ProductAdd.component";

export const AppContext = createContext();

const initialState = [];

const App = () => {
    const [items, dispatchItems] = useImmerReducer(stateReducer, initialState);

    return (
        <AppContext.Provider value={[items, dispatchItems]}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <AddComponentForm/>
                </Col>
            </Row>
            <Divider/>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <Table dataSource={items} columns={FORM_COLUMNS}/>
                </Col>
            </Row>
            <Divider/>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <AddProduct/>
                </Col>
            </Row>
        </AppContext.Provider>
    );
};

export default App;
