import React, {useState, useContext} from 'react';
import {Button, Form, Row, Typography} from 'antd';

import {FormInput} from './FormInput.component';

import {TodoContext} from '../../App';

const {Title} = Typography;

export const AddTodoForm = () => {
    const [form, setForm] = useState();
    const [, dispatchTodos] = useContext(TodoContext);
    const addEnabled = form && form.length >= 1;

    const formSubmit = () => {
        dispatchTodos({type: 'ADD_ITEM', payload: [form]});
    };

    return (
        <>
            <Form onFinish={formSubmit}>
                <Title level={4}>Wybierz komponent</Title>
                <Row type="flex" justify="center">
                    <FormInput setForm={setForm}/>
                </Row>
                <Row>
                    <Button type="primary" htmlType="submit" block disabled={!addEnabled}>Dodaj do zestawu</Button>
                </Row>
            </Form>
        </>
    );
};
