import React, {useState, useContext} from 'react';
import {Button, Form, Row, Typography, AutoComplete} from 'antd';

import {AppContext} from '../../App';
import {getProductsApiCall} from "../../api/ProductsApi";

const {Title} = Typography;

export const AddForm = () => {
    const [form, setForm] = useState();
    const [, dispatchItems] = useContext(AppContext);
    const addEnabled = form && form.length >= 1;

    const formSubmit = () => {
        dispatchItems({type: 'ADD_ITEM', payload: [form]});
    };

    return (
        <>
            <Form onFinish={formSubmit}>
                <Title level={4}>Wybierz komponent</Title>
                <Row type="flex" justify="center">
                    <Complete/>
                </Row>
                <Row>
                    <Button type="primary" htmlType="submit" block disabled={!addEnabled}>Dodaj do zestawu</Button>
                </Row>
            </Form>
        </>
    );
};


class Complete extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            isLoaded: false,
            products: []
        }
    }

    fetchList = () => {
        getProductsApiCall()
            .then(res => res.json())
            .then(
                (data) => {
                    this.setState({
                        isLoaded: true,
                        products: data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.fetchList()
    }

    mapProduct = function (val) {
        return {
            key: val.slug,
            value: val.name
        };
    }

    render() {
        return (
            <AutoComplete
                style={{width: 450,}}
                options={this.state.products.map(this.mapProduct)}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                // onSelect={e => {
                //     setForm(e.target.value);
                // }}
            >
            </AutoComplete>
        )
    }
}