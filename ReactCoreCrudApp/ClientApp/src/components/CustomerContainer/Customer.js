import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import CustomerData from './CustomerData';
import CustomerModalFormData from './CustomerModalFormData';
import axios from 'axios';
export default class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerList: [],
            updatedId: 0,
            name: '',
            address: '',
            showModal: false,
        }
        this.handleAddNewCustomer = this.handleAddNewCustomer.bind(this);
        this.selectCustomer = this.selectCustomer.bind(this);
        this.saveCustomer = this.saveCustomer.bind(this);
        this.deleteSelectCustomer = this.deleteSelectCustomer.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/Customer/customers')
            .then(res => {
                this.setState({
                    customerList: res.data.customerList
                })
            })
            .catch(error => alert(error))
    }

    handleAddNewCustomer() {
        this.setState({
            name: '',
            address: '',
            showModal: true
        })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    selectCustomer(customer) {
        this.setState({
            updatedId: customer.id,
            name: customer.name,
            address: customer.address,
            showModal: true
        })
    }
    deleteSelectCustomer(customer) {
        axios({
            method: 'post',
            url: '/api/Customer/deleteCustomers',
            data: { ...customer } //data: customer or data:{'Name':customer.name,'Address':customer.address}
        })
            .then(function (response) {
                alert("your selected Customer has been deleted");
                window.location.reload();
            })
            .catch(error => alert(error));
    }
    saveCustomer(customer) {
        //axios.post('/api/Customer/editCustomers',customer)

        let self = this;
        axios({
            method: 'post',
            url: '/api/Customer/editCustomers',
            data: { ...customer } //data: customer or data:{'Name':customer.name,'Address':customer.address}
        })
            .then(function (response) {
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
                <h3>Customer List</h3>
                <Button basic color='blue' onClick={() => this.handleAddNewCustomer()}><Icon name="check" />Create New</Button>
                <CustomerData
                    deleteSelectCustomer={this.deleteSelectCustomer}
                    customerData={this.state.customerList}
                    selectCustomer={this.selectCustomer}
                />
                {this.state.showModal &&
                    <CustomerModalFormData
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        saveCustomer={this.saveCustomer}
                        selectCustomer={this.selectCustomer}
                        handleChange={this.handleChange}
                        name={this.state.name}
                        address={this.state.address}
                        updatedId={this.state.updatedId}
                    />
                }
            </div>
        );
    }
}