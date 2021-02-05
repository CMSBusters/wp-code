import React, {useContext, useState} from "react";
import {createProductApiCall} from "../api/ProductsApi";
import {Button, Col, Form, Input, InputNumber, Row} from "antd";
import {AppContext} from "../App";
import {Title} from "./Title/Title.component";
import {TagsOutlined} from "@ant-design/icons";

export const AddProduct = () => {
    const [items, dispatchItems] = useContext(AppContext);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
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

    // const setDiscount = (value) => {
    //     let discountAmount = price * value;
    //     setPrice(discountAmount);
    // };

    const formSubmit = () => {
        let desc = items.reduce((acc, curVal) => `${acc} ${curVal.title},`, '');
        createProduct(name, desc, price);
    };

    return (
        <>
            <Form onFinish={formSubmit}>
                <Title level={4}>Zestaw</Title>
                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Form.Item label="Nazwa" name="name">
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
                        <Form.Item label="Cena zestawu" name="price">
                            <InputNumber
                                suffix="PLN"
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                onChange={setPrice}
                            />
                        </Form.Item>
                        {/*<Form.Item label="Rabat" name="discount">*/}
                        {/*    <InputNumber*/}
                        {/*        defaultValue={0}*/}
                        {/*        min={0}*/}
                        {/*        max={100}*/}
                        {/*        formatter={value => `${value}%`}*/}
                        {/*        parser={value => value.replace('%', '')}*/}
                        {/*        onChange={setDiscount}*/}
                        {/*    />*/}
                        {/*</Form.Item>*/}
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