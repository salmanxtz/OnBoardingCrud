import React from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
export default class StoreTableData extends React.Component {
   
    render() {
        const store = this.props.store;
        return (
            <Table.Row>
                <Table.Cell>{store.id}</Table.Cell>
                <Table.Cell>{store.name}</Table.Cell>
                <Table.Cell>{store.address}</Table.Cell>
                <Table.Cell><Button name='Edit' basic color='yellow' store={store} onClick={() => this.props.selectStore(store)}>
                        <Icon name="edit"></Icon>Edit</Button>
                </Table.Cell>
                <Table.Cell><Button name='Delete' basic color='red' store={store} onClick={() => this.props.deleteSelectStore(store)}>
                        <Icon name="trash alternate"></Icon>Delete</Button>
                </Table.Cell>
            </Table.Row>
        );
    }
}