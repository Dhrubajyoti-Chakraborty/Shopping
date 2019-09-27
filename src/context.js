import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';
const ProductContext = React.createContext();
//provider
//consumer
class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        carTotal: 0,

    };

    
        increment = id => {
            let tempCart = [ ...this.state.cart ];
            const selectProduct = tempCart.find(item => item.id === id)
            const index = tempCart.indexOf(selectProduct);
            const product = tempCart[index];
            product.count = product.count + 1;
            product.total = product.count * product.price;

            this.setState(() => {
                return {
                    cart: [...tempCart]
                }
            },
             () => {
                 this.addTotals();
             }

            );
        };
    

    decrement = (id) => {
        let tempCart = [ ...this.state.cart ];
            const selectProduct = tempCart.find(item => item.id === id)
            const index = tempCart.indexOf(selectProduct);
            const product = tempCart[index];
            product.count = product.count - 1;

            if (product.count===0){
                this.removeItem(id)
            } else {
                product.total = product.count * product.price;
             
                this.setState(() => {
                    return {
                        cart: [...tempCart]
                    }
                },
                 () => {
                     this.addTotals();
                 }
    
                );
            };

            
    };

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];
        tempCart = tempCart.filter(item => item.id != id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removeProduct = tempProducts[index];

        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            }
        }, () => {
            this.addTotals();
        }
        );
    };

    clearCart = (id) => {
        console.log('this is clear cart');
    }

    addTotals = () => {
        let SubTotal = 0;
        this.state.cart.map(item => (SubTotal += item.total));
        const tempTax = SubTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = SubTotal + tax;

        this.setState(() => {
            return {
                cartSubTotal: SubTotal,
                cartTax: tax,
                carTotal: total
            }
        })
    }


    componentDidMount() {
        this.setProducts();
    }
    setProducts = () => {
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            tempProducts = [...tempProducts, singleItem];
        });
        this.setState(() => {
            return { products: tempProducts };
        });
    };

    getItem = (id) => {
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail = (id) => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product }
        })
    };
    addToCart = (id) => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState(
            () => {
                console.log(this.state);
            }
        );
    };

    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true }
        })
    }

    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false }
        })
    }



    render() {
        return (
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                removeItem: this.removeItem,
                clearCart: this.clearCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer }
