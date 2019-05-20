import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import StoreData from './StoreData';
import StoreModalFormData from './StoreModalFormData';
export default class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeList: [],
            updatedId:0,
            name: '',
            address: '',
            showModal: false
        }
        this.handleAddNewStore = this.handleAddNewStore.bind(this);
        this.selectStore = this.selectStore.bind(this);
        this.saveStore = this.saveStore.bind(this);
        this.deleteSelectStore = this.deleteSelectStore.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get('/api/Store/stores')
            .then(res => {
                this.setState({
                    storeList: res.data.storeList
                })
            })
            .catch(error => alert(error))
    }

    handleAddNewStore() {
        this.setState({
            name: '',
            address: '',
            showModal: true
        })
    }

    handleChange(e) {        
        this.setState({ [e.target.name]: e.target.value });
    }

    selectStore(store) {
        this.setState({
            updatedId: store.id,
            name: store.name,
            address: store.address,
            showModal: true
        })
    }

    deleteSelectStore(store) {
        axios({
            method: 'post',
            url: '/api/Store/deleteStores',
            data: { ...store } //data: store or data:{'Name':store.name,'Address':store.address}
        })
            .then(function (response) {
                alert("your selected Store has been deleted");
                window.location.reload();
            })
            .catch(error => alert(error));
    }

    saveStore(store) {
        //axios.post('/api/Store/editStores',store)
        
        let self = this;
        axios({
            method: 'post',
            url: '/api/Store/editStores',
            data: { ...store } //data: store or data:{'Name':store.Name,'Address':store.address}
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
                <h3>Store List</h3>
                <Button basic color='blue'
                    onClick={() => this.handleAddNewStore()}>
                    <Icon name="check" />Create New
                </Button>
                <StoreData
                    deleteSelectStore={this.deleteSelectStore}
                    storeData={this.state.storeList}
                    selectStore={this.selectStore}
                />
                {this.state.showModal &&
                    <StoreModalFormData
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        saveStore={this.saveStore}
                        selectStore={this.selectStore}
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