import React, { Component } from 'react'
import Product from './Product';
import Title from './Title';

import { ProductConsumer } from '../context';


export default class ProductList extends Component {
  
    render() {
        
        return (
            <>
                <div class="py-5">
                    <div class="container">
                        <Title name="our" title="products" />
                        <div class="row">
                            <ProductConsumer>
                                {value => {
                                    return value.products.map(
                                        product => {
                                            return <Product key={product.id} product={product} />
                                        }
                                    )
                                }

                                }
                            </ProductConsumer>

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
