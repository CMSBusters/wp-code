import React, {useContext, useState} from "react";
import {createProductApiCall} from "../api/ProductsApi";
import {Button, Col, Form, Input, Row} from "antd";
import {AppContext} from "../App";
import {Title} from "./Title/Title.component";
import {TagsOutlined} from "@ant-design/icons";

export const AddProduct = () => {
    const [items, dispatchItems] = useContext(AppContext);
    const [name, setName] = useState('');
    const [form] = Form.useForm();
    const [, setState] = useState({
        isLoaded: false,
        error: null,
        item: [],
    })

    const createProduct = (name, desc, price) => {
        createProductApiCall(name, desc, price)
            .then(res => res.json())
            .then(
                (data) => {
                    setState({
                        isLoaded: true,
                        error: null,
                        item: data,
                    });
                    dispatchItems({type: 'CLEAR_LIST'});
                    form.resetFields();
                },
                (error) => {
                    setState({
                        isLoaded: true,
                        error,
                        item: []
                    });
                }
            );
    }

    const formSubmit = () => {
        let desc = items.reduce((acc, curVal) => `${acc} ${curVal.title},`, '');
        let totalPrice = items.reduce(function (acc, obj) { return acc + parseInt(obj.price); }, 0);
        createProduct(name, desc, totalPrice);
    };

    return (
        <>
            <Form form={form} onFinish={formSubmit}>
                <Title level={4}>Zestaw</Title>
                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item label="Nazwa" name="name"
                                   rules={[{required: true, message: 'Wpisz nazwę zestawu!'}]}>
                            <Input
                                prefix={
                                    <TagsOutlined/> // Icon
                                }
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Button type="primary" htmlType="submit" block>
                            Zapisz zestaw
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};