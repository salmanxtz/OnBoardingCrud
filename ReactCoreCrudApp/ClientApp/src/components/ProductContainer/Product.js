import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import ProductData from './ProductData.jsx';
import ProductFormModal from './ProductFormModal.js';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            showModal: false,
            name: "",
            price: "",
            updatedId: 0
        };

        this.handleAddNewProduct = this.handleAddNewProduct.bind(this);
        this.selectProduct = this.selectProduct.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
        this.deleteSelectProduct = this.deleteSelectProduct.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/Product/products')
            .then(res => {
                this.setState({
                    productList: res.data.productList
                })
            })
            .catch(error => alert(error))
    }

    // Add New Product
    handleAddNewProduct() {
        this.setState({
            name: "",
            price: "",
            showModal: true
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    selectProduct(product) {
        this.setState({
            updatedId: product.id,
            name: product.name,
            price: product.price,
            showModal: true
        })
    }

    deleteSelectProduct(product) {
        axios({
            method: 'post',
            url: '/api/Product/deleteProducts',
            data: { ...product } //data: product or data:{'Name':product.Name,'Price':product.Price}
        })
            .then(function (response) {
                alert("your selected product has been deleted");
                window.location.reload();
            })
            .catch(error => alert(error));
    }
    saveProduct(product) {
        //axios.post('/api/Product/editProducts',product)
        
        let self = this;
        axios({
            method: 'post',
            url: '/api/Product/editProducts',
            data: { ...product } //data: product or data:{'Name':product.Name,'Price':product.Price}
        })
            .then(function (response) {
                console.log(response);
                self.setState({
                    showModal: false
                })
                window.location.reload();
            })
            .catch(error => alert(error));
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    render() {

        return (
            <div>
                <h3>Product List</h3>
                <Button basic color='blue' onClick={() => this.handleAddNewProduct()}><Icon name="check" />Create New</Button>
                <ProductData deleteSelectProduct={this.deleteSelectProduct} productData={this.state.productList} selectProduct={this.selectProduct} />
                {this.state.showModal &&
                    <ProductFormModal
                    showModal={this.state.showModal}
                    closeModal={this.closeModal}                    
                    saveProduct={this.saveProduct}
                    selectProduct={this.selectProduct}
                    handleChange={this.handleChange}
                    name={this.state.name}
                    price={this.state.price}
                    updatedId={this.state.updatedId}
                />
                }
            </div>
        );
    }
}