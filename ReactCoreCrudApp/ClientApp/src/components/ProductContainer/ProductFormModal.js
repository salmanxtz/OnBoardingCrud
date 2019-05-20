import React from 'react';
import { Button, Modal, Form, Input } from 'semantic-ui-react';

const style = {
    top: 20 + '%',
    bottom: 'auto',
    position: 'absolute',
    zIndex: 9000,
    left: 30 + '%',
}

export default class ProductFormModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);   
    }
    
    handleSubmit() {
        let selectedProduct = { "Id": this.props.updatedId, "Name": this.props.name, "Price": this.props.price };
        this.props.saveProduct(selectedProduct);
    }
    render(){
        const { showModal }= this.props;
        return (
            <div>
                <Modal open={showModal} size='tiny' style={style}>
                    <Modal.Header>Product</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Product Name</label>
                                <Input name="name" placeholder="Product Name" value={this.props.name}
                                    onChange={this.props.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Product Price</label>
                                <Input name="price" placeholder="Product Price" value={this.props.price}
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