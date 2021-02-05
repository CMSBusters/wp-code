import React, {useState, useContext} from 'react';
import {Button, Form, Row, Typography, AutoComplete, Col} from 'antd';

import {AppContext} from '../../App';
import {getProductsApiCall} from "../../api/ProductsApi";

const {Title} = Typography;

export const AddComponentForm = () => {
    const [form, setForm] = useState();
    const [price, setPrice] = useState();
    const [formControl] = Form.useForm();
    const [, dispatchItems] = useContext(AppContext);

    const formSubmit = () => {
        dispatchItems({type: 'ADD_ITEM', payload: [form, price]});
        formControl.resetFields();
    };

    return (
        <>
            <Form form={formControl} onFinish={formSubmit}>
                <Title level={4}>Wybierz komponent</Title>
                <Row type="flex" justify="center">
                    <Form.Item name="compnent">
                        <Complete setForm={setForm} setPrice={setPrice}/>
                    </Form.Item>
                </Row>
                <Row type="flex" justify="center">
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                        <Button type="primary" htmlType="submit" block>Dodaj do zestawu</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
};


class Complete extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            products: [],
        }
    }

    handleChange(value) {
        this.props.setForm(value);
        const regexp = /wartość: (?<price>.+) z/gm;
        let match = regexp.exec(value);
        do {
            this.props.setPrice(parseInt(match.groups.price) + ' zł');
        } while((match = regexp.exec(value)) !== null);
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
            label: val.id + '. ' + val.name + ' - wartość: ' + val.price + ' zł',
            value: val.id + '. ' + val.name + ' - wartość: ' + val.price + ' zł',
        };
    };

    render() {
        return (
            <AutoComplete
                style={{width: 450}}
                allowClear={true}
                autoFocus={true}
                placeholder='Wpisz nazwę...'
                options={this.state.products.map(this.mapProduct)}
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onSelect={value => this.handleChange(value)}
            />
        )
    }
}