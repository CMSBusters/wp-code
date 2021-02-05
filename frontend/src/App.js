import React, {createContext} from 'react';
import {useImmerReducer} from 'use-immer';
import {Table, Row, Col, Divider, Typography} from 'antd';

import 'antd/dist/antd.css';
import './App.css';

import {AddComponentForm} from './components/Form/AddAutoCompleteForm.component';
import {stateReducer} from './functions/stateReducer.js';

import {FORM_COLUMNS} from './constants/FORM_COLUMNS';
import {AddProduct} from "./components/ProductAdd.component";

const {Text} = Typography;
export const AppContext = createContext();

const initialState = [];

const App = () => {
    const [items, dispatchItems] = useImmerReducer(stateReducer, initialState);

    return (
        <AppContext.Provider value={[items, dispatchItems]}>
            <Divider/>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <AddComponentForm/>
                </Col>
            </Row>
            <Divider/>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={16}>
                    <Table dataSource={items}
                           columns={FORM_COLUMNS}
                           summary={pageData => {
                               let totalPrice = 0;

                               pageData.forEach(({price}) => {
                                   totalPrice += parseInt(price);
                               });

                               return (
                                   <>
                                       <Table.Summary.Row>
                                           <Table.Summary.Cell>Suma</Table.Summary.Cell>
                                           <Table.Summary.Cell>
                                               <Text type="primary">{totalPrice} zł</Text>
                                           </Table.Summary.Cell>
                                       </Table.Summary.Row>
                                   </>
                               );
                           }}
                    />
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
