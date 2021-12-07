import queryString from 'query-string';


//to fetch product by arrival date
export const getProducts = (sortBy) => {
    return fetch(`http://localhost:5000/api/getproduct?sortBy=${sortBy}&order=desc&limit=8`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error =>
            console.log(error));
}



//to fetch singleproduct
export const read = (productId) => {
    return fetch(`http://localhost:5000/api/singleproduct/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error =>
            console.log(error));

}



//to fetch related product
export const listRelated = (productId) => {
    return fetch(`http://localhost:5000/api/products/related/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error =>
            console.log(error));

}

//to fetch categories
export const getCategories = () => {
    return fetch(`http://localhost:5000/api/showcategory`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });

}

//to filter products by category and price range
export const getFilteredProducts = (skip, limit, filters = {}) => {
    let data = { limit, skip, filters }

    return fetch(`http://localhost:5000/api/products/by/search`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

//to search product
export const list = params => {
    const query = queryString.stringify(params)
    return fetch(`http://localhost:5000/api/products/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(error =>
            console.log(error));

}