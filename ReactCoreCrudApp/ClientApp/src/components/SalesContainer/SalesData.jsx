import React from 'react';
import SalesTableData from './SalesTableData';
import { Table } from 'semantic-ui-react';
export default class SalesData extends React.Component {
    render() {
        const salesList = this.props.salesList;
        return (
            <Table celled color='green'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>DateSold</Table.HeaderCell>
                        <Table.HeaderCell>Customer Name</Table.HeaderCell>
                        <Table.HeaderCell>Product Name</Table.HeaderCell>
                        <Table.HeaderCell>Store Address</Table.HeaderCell>
                        <Table.HeaderCell>Action(Edit)</Table.HeaderCell>
                        <Table.HeaderCell>Action(Delete)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        salesList.map(sales => (
                            <SalesTableData
                                key={sales.id}
                                sales={sales}
                                selectSale={this.props.selectSale}
                                deleteMappedSale={this.props.deleteMappedSale}
                            />
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }
}
