import React, {useContext, useState} from "react";
import {createProductApiCall} from "../api/ProductsApi";
import {Button} from "antd";
import {AppContext} from "../App";

export const AddProduct = () => {
    const [, dispatchItems] = useContext(AppContext);
    const [, setState] = useState({
        isLoaded: false,
        error: null,
        item: [],
    })

    const createProduct = () => {
        createProductApiCall('test name', 'test desc')
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

    return (
        <Button type="default" onClick={createProduct} block>
            Zapisz zestaw
        </Button>
    );
};