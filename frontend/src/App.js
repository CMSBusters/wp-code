import React, {createContext} from 'react';
import {useImmerReducer} from 'use-immer';
import {Table, Row, Col, Button, Divider} from 'antd';

import 'antd/dist/antd.css';
import './App.css';

import {AddComponentForm} from './components/Form/AddAutoCompleteForm.component';
import {AddForm} from './components/Form/AddForm.component';
import {stateReducer} from './functions/stateReducer.js';

import {FORM_COLUMNS} from './constants/FORM_COLUMNS';

export const AppContext = createContext();

const App = () => {
    const [items, dispatchItems] = useImmerReducer(stateReducer, []);

    const productAdd = () => {
        items.forEach(element => dispatchItems({type: 'DELETE_ITEMS', payload: element.key}));
        //todo save to wordpress DB using POST to /products API
    };

    return (
        <AppContext.Provider value={[items, dispatchItems]}>
            <Row type="flex" justify="left">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <AddComponentForm/>
                </Col>
            </Row>
            <Row type="flex" justify="left">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <Table dataSource={items} columns={FORM_COLUMNS}/>
                </Col>
            </Row>
            <Divider />
            <Row type="flex" justify="left">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <AddForm/>
                </Col>
            </Row>
            <Row type="flex" justify="left">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <Button type="default" onClick={productAdd} block>Zapisz zestaw</Button>
                </Col>
            </Row>
        </AppContext.Provider>
    );
};

export default App;
