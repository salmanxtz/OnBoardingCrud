import React, { Component } from 'react';
import axios from 'axios';
import SalesData from './SalesData.jsx';
import SalesModalFormData from './SalesModalFormData';
import { Button,Icon } from 'semantic-ui-react';

export default class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSales: '',
            showModal: false,
            salesList: [],
            productList: [],
            customerList: [],
            storeList: [],
            id: '',
            customerName: '',
            productName: '',
            storeAddress: '',
            dateSold: '',
            x: false
        };
        this.handleAddNewSales = this.handleAddNewSales.bind(this);
        this.selectSale = this.selectSale.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveMappedSale = this.saveMappedSale.bind(this);
        this.deleteMappedSale = this.deleteMappedSale.bind(this);
        this.getList = this.getList.bind(this);
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }

    getList() {
        let self = this;
        axios.get('/api/Sales/sales')
            .then(res => {
                self.setState({
                    salesList: res.data.salesList
                });
            });
        axios.get('/api/Product/products')
            .then(res => {
                self.setState({
                    productList: res.data.productList
                });
            });
        axios.get('/api/Customer/customers')
            .then(res => {
                self.setState({
                    customerList: res.data.customerList
                });
            });
        axios.get('/api/Store/stores')
            .then(res => {
                self.setState({
                    storeList: res.data.storeList
                });
            });

    }

    componentDidMount() {
        let self = this;
        self.getList();
    }

    selectSale(mappedSale) {
        this.setState({
            selectedSales: mappedSale,
            showModal: true
        })
    }

    handleAddNewSales() {
        this.setState({
            selectedSales: {},
            showModal: true
        });
    }

    saveMappedSale(mappedSale) {
        let self = this;
        axios({
            method: 'post',
            url: '/api/Sales/saveMappedSales',
            data: { ...mappedSale }
        })
            .then(function (response) {
                console.log(response.data);
                self.setState({
                    showModal: false
                });
                self.getList();
            })
            .catch(error => alert(error));
    }

    deleteMappedSale(mappedSale) {
        let self = this;
        axios({
            method: 'post',
            url: '/api/Sales/deleteMappedSales',
            data: { ...mappedSale }
        })
            .then(function (response) {
                console.log(response);
                alert("your selected mapped sales has been deleted");
                self.getList();
            })
            .catch(error => alert(error))
    }

    render() {
        return (
            <div>
                <h3>Sales List</h3>
                <Button basic color='blue' onClick={() => this.handleAddNewSales()}>
                    <Icon name="check" />
                    Create New Sales
                </Button>
                <SalesData salesList={this.state.salesList} selectSale={this.selectSale}
                    deleteMappedSale={this.deleteMappedSale}
                />
                {this.state.selectedSales &&
                    <SalesModalFormData
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        customerList={this.state.customerList}
                        productList={this.state.productList}
                        storeList={this.state.storeList}
                        selectSale={this.selectSale}
                        selectedSales={this.state.selectedSales}
                        saveMappedSale={this.saveMappedSale}
                    />
                }
            </div>
        );
    }
}

     //dateConverter(tempdate) {
     //    var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")))
     //    var temp = new Date(converted)
     //    var date = ((temp.getMonth() + 1) + "/" + temp.getDate() + "/" + temp.getFullYear())
     //    console.log(date);
     //    return date
     //}
    //dateConverter(DateSold) {
    //    console.log(DateSold);
    //    debugger;
    //    if (!DateSold) {
    //        var dateObj = new Date(parseInt(DateSold.substr(6)))
    //        var date = (dateObj.getDate()) + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
    //        return date
    //        console.log("date" + date)
    //    }
    //    else {
    //        var dateObj = new Date(parseInt(DateSold.substr(6)))
    //        var date = (dateObj.getDate()) + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
    //        return date
    //        console.log("date" + date)
    //    }

    //}



//let SalesData = null;
//SalesData =
//    this.state.SalesList.map(sales =>
//        <tr key={sales.id}>
//            <td>{sales.customerName}</td>
//            <td>{sales.productName}</td>
//            <td>{sales.storeAddress}</td>
//            <td>{sales.dateSold}</td>
//            <td><a href="#">Edit</a></td>
//            <td><a href="#">Delete</a></td>
//        </tr>
//    );

//const SalesTableData = () =>

//    <div>

//        <table className="table table-striped">
//            <thead>

//                <tr>
//                    <th>Customer Name</th>
//                    <th>Product Name</th>
//                    <th>Store Address</th>
//                    <th>DateSold</th>
//                    <th>Action(Edit)</th>
//                    <th>Action(delete)</th>
//                </tr>
//            </thead>
//            <tbody>
//                {SalesData}
//            </tbody>
//        </table>

//    </div>



//return (
//    <div>
//        <h1>SalesList</h1>
//        <button >Create New</button>
//        <SalesTableData />
//    </div>
//);