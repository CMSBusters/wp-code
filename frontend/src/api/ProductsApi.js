import React from "react";

const baseUrl = 'https://cms.gierwatowski.pl/blog/wp-json/wc/v3'
const auth = 'Basic Y2tfY2MwMzkxYjg1Yzg5YzU4MjRhNDU3YjVhMjdhMGM0NGJiNTc5NDZlNDpjc19lMmZiNWZiMzAwY2E3ODI4YWEyZmIwZTBiOWQ3NTIwZTQ2NmQ1Y2Y5'

export function getProductsApiCall() {
    return fetch(baseUrl + '/products/?per_page=100', {
        headers: new Headers({'Authorization': auth})
    });
}