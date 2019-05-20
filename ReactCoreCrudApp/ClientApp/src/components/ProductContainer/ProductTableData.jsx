import React from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
export default class ProductTableData extends React.Component {
   
    render() {
        const product = this.props.product;       
        return (
            <Table.Row>
                <Table.Cell>{product.id}</Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell><Button name='Edit' basic color='yellow' product={product}
                    onClick={() => this.props.selectProduct(product)}>
                    <Icon name="edit"></Icon>Edit</Button>
                </Table.Cell>
                <Table.Cell><Button name='Delete' basic color='red' product={product}
                    onClick={() => this.props.deleteSelectProduct(product)}>
                    <Icon name="trash alternate"></Icon>Delete</Button>
                </Table.Cell>
            </Table.Row>
            );
    }

}