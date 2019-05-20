import React from 'react';
import CustomerTableData from './CustomerTableData';
import { Table } from 'semantic-ui-react';
export default class CustomerData extends React.Component {

    render() {
        const customerData = this.props.customerData;
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Customer Id</Table.HeaderCell>
                        <Table.HeaderCell> Customer Name</Table.HeaderCell>
                        <Table.HeaderCell>Customer Address</Table.HeaderCell>
                        <Table.HeaderCell>Action(Edit)</Table.HeaderCell>
                        <Table.HeaderCell>Action(Delete)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        customerData.map((customer, key) => (
                            <CustomerTableData
                                key={key}
                                deleteSelectCustomer={this.props.deleteSelectCustomer}
                                customer={customer}
                                selectCustomer={this.props.selectCustomer}
                            />
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }
}