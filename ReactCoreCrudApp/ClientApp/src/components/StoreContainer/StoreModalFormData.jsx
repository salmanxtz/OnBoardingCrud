import React from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react';

const style = {
    top: 20 + '%',
    bottom: 'auto',
    position: 'absolute',
    zIndex: 9000,
    left: 30 + '%',
}

export default class StoreModalFormData extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        let selectedStore = { "Id": this.props.updatedId, "Name": this.props.name, "Address": this.props.address };
        this.props.saveStore(selectedStore);
    }
    render() {
        const { showModal } = this.props;
        return (
            <div>
                <Modal open={showModal} size='tiny' style={style}>
                    <Modal.Header>Store Details</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Store Name</label>
                                <Input name="name" placeholder="Store Name" value={this.props.name}
                                    onChange={this.props.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Store Address</label>
                                <Input name="address" placeholder="Store Address" value={this.props.address}
                                    onChange={this.props.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={() => { this.props.closeModal() }}>Close</Button>
                        <Button basic color='green' onClick={this.handleSubmit}>Save</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )

    }
}