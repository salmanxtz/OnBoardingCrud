import React from 'react';
import StoreTableData from './StoreTableData';
import { Table } from 'semantic-ui-react';
export default class StoreData extends React.Component {
    
    render() {
        const storeData = this.props.storeData;
        return (
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Store Id</Table.HeaderCell>
                        <Table.HeaderCell> Store Name</Table.HeaderCell>
                        <Table.HeaderCell>Store Address</Table.HeaderCell>
                        <Table.HeaderCell>Action(Edit)</Table.HeaderCell>
                        <Table.HeaderCell>Action(Delete)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        storeData.map((store, key) => (
                            <StoreTableData
                                key={key}
                                deleteSelectStore={this.props.deleteSelectStore}
                                store={store}
                                selectStore={this.props.selectStore}
                            />
                        ))
                    }
                </Table.Body>
            </Table>
        );
    }
}