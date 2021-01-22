import React, {useState, useContext} from 'react';
import {Button, Form, Row, Typography} from 'antd';

import {FormInput} from './FormInput.component';

import {AppContext} from '../../App';

const {Title} = Typography;

export const AddForm = () => {
    const [form, setForm] = useState();
    // const [, dispatchItems] = useContext(AppContext);
    // const addEnabled = form && form.length >= 1;

    const formSubmit = () => {
        // dispatchItems({type: 'ADD_ITEM', payload: [form]});
    };

    return (
        <>
            <Form onFinish={formSubmit}>
                <Title level={4}>Nazwa zestawu</Title>
                <Row type="flex" justify="center">
                    <FormInput setForm={setForm}/>
                </Row>
            </Form>
        </>
    );
};
