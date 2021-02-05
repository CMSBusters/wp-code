import React from "react";

const baseUrl = 'https://cms.gierwatowski.pl/blog/wp-json/wc/v3'
const auth = 'Basic Y2tfY2MwMzkxYjg1Yzg5YzU4MjRhNDU3YjVhMjdhMGM0NGJiNTc5NDZlNDpjc19lMmZiNWZiMzAwY2E3ODI4YWEyZmIwZTBiOWQ3NTIwZTQ2NmQ1Y2Y5'

export function getProductsApiCall() {
    return fetch(baseUrl + '/products/?per_page=100', {
        headers: new Headers({'Authorization': auth})
    });
}

export function createProductApiCall(name, desc) {
    const product = {
        name: name,
        type: "simple",
        regular_price: "21.99",
        description: desc,
        short_description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        categories: [{id: 76}],
        images: [{src: "https://cms.gierwatowski.pl/blog/wp-content/uploads/2021/01/001.jpgFA7C74F9-9769-4697-977E-9798EC170A58Large.jpg"}]
    };

    return fetch(baseUrl + '/products', {
        method: 'POST',
        headers: {
            'Authorization': auth,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
}