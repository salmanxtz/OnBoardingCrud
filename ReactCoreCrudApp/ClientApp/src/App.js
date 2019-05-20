import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Customer from './components/CustomerContainer/Customer';
import Product from './components/ProductContainer/Product';
import Store from './components/StoreContainer/Store';
import Sales from './components/SalesContainer/Sales';


export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />        
            <Route path='/CustomerContainer/customer' component={Customer} />
            <Route path='/ProductContainer/product' component={Product} />
            <Route path='/StoreContainer/store' component={Store} />
            <Route path='/SalesContainer/sales' component={Sales} />

      </Layout>
    );
  }
}


