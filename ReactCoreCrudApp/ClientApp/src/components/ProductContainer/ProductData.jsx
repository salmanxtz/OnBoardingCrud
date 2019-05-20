import React from 'react';
import ProductTableData from './ProductTableData';
import { Table } from 'semantic-ui-react';
export default class ProductData extends React.Component {

    render() {
        const productData = this.props.productData;

        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Product Id</Table.HeaderCell>
                        <Table.HeaderCell> Product Name</Table.HeaderCell>
                        <Table.HeaderCell>Product Price</Table.HeaderCell>
                        <Table.HeaderCell>Action(Edit)</Table.HeaderCell>
                        <Table.HeaderCell>Action(Delete)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        productData.map((product, key) => (
                            <ProductTableData
                                key={key}
                                deleteSelectProduct={this.props.deleteSelectProduct}
                                product={product}
                                selectProduct={this.props.selectProduct} />
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }
}