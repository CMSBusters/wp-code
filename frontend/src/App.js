import React, {createContext} from 'react';
import {useImmerReducer} from 'use-immer';
import {Table, Row, Col} from 'antd';

import 'antd/dist/antd.css';
import './App.css';

import {AddTodoForm} from './components/Form/AddForm.component';
import {stateReducer} from './utils/functions/stateReducer.js';

import {FORM_COLUMNS} from './utils/constants/FORM_COLUMNS';

export const AppContext = createContext();

const App = () => {
    const [todos, dispatchTodos] = useImmerReducer(stateReducer, []);
    return (
        <AppContext.Provider value={[todos, dispatchTodos]}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Table dataSource={todos} columns={FORM_COLUMNS}/>
                </Col>
            </Row>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <AddTodoForm/>
                </Col>
            </Row>
        </AppContext.Provider>
    );
};

export default App;
