import React from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
export default class CustomerTableData extends React.Component {

    render() {
        const customer = this.props.customer;
        return (
            <Table.Row>
                <Table.Cell>{customer.id}</Table.Cell>
                <Table.Cell>{customer.name}</Table.Cell>
                <Table.Cell>{customer.address}</Table.Cell>
                <Table.Cell>
                    <Button name='Edit' basic color='yellow'
                        customer={customer} onClick={() => this.props.selectCustomer(customer)}>
                        <Icon name="edit"></Icon>
                        Edit
                    </Button>
                </Table.Cell>
                <Table.Cell>
                    <Button name='Delete' basic color='red'
                        customer={customer} onClick={() => this.props.deleteSelectCustomer(customer)}>
                        <Icon name="trash alternate"></Icon>
                        Delete
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}