import React, { useState, useEffect } from 'react'
import { getCategories, getFilteredProducts } from './uiApi';
import Card from './Card';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import { prices } from './fixedPrice';
import Navbar from '../layouts/Navbar';

const Products = () => {


    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });

    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [filteredResults, setFilteredResults] = useState([]);
    const [size, setSize] = useState(0);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }
    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)

    }, []);
    const handleFilters = (filters, filterBy) => {
        //console.log("PRODUCTS",filters,filterBy);
        const newFilters = { ...myFilters }
        newFilters.filters[filterBy] = filters

        if (filterBy === "product_price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)

        setMyFilters(newFilters)


    }
    const handlePrice = value => {
        const data = prices
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const loadFilteredResults = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFilteredResults(data.data);
                    setSize(data.size);
                    setSkip(0);

                }
            })
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size >= 0 &&
            size >= limit && (
                <center> <button onClick={loadMore} className="btn btn-warning m-5" style={{ margin: '10px', padding: '10px', width: '150px', fontSize: '20px' }}>
                    Load more
            </button>
                </center>
            )
        );
    };

    return (
        <>
            <Navbar />
            <div className="container-flud">
                <div className="row ">
                    <div class="col-md-3">
                        <div class="left-side">
                            <h3 class="text-danger">Filter By Categories</h3>
                            <br/>
                            <ul>
                                <Checkbox categories={categories}
                                    handleFilters={filters => handleFilters(filters, 'category')}
                                />
                            </ul>
                            <br/>
                            <h3 class="text-danger" >Filter by Price Range</h3>
                            <br/>
                            <ul>
                                <RadioBox prices={prices}
                                    handleFilters={filters => handleFilters(filters, 'product_price')}
                                />
                            </ul>
                        </div>
                    </div>
                    <div class="agileinfo-ads-display col-md-9">
                        <div class="wrapper">
                            {filteredResults.map((product, i) => (
                                <Card key={i} product={product} />
                            ))}
                            {loadMoreButton()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products