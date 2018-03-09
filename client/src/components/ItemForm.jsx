import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, InputGroup, InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter, Media } from 'reactstrap';


import Dropzone from 'react-dropzone';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'vdivzjz5';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwid55cj4/upload';




class ItemForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      class:'',
      name: '',
      category: '',
      subcategory: '',
      description:'',
      cost: '',
      condition:'',
      material:'',
      image:'',
      uploadedFile: {},
      uploadedCloudinaryURL: '',
      modal: false,
    };

    this.change = this.change.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);

  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

//function that holds state based upon input data collected in form before submission
  change(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  onSubmit(event) {
    console.log(1);
//stores data on submission to send via ajax call
    event.preventDefault();
    var itemData = {
      name: this.state.name,
      description:this.state.description,
      category: this.state.category,
      subcategory: this.state.subcategory,
      cost: this.state.cost,
      condition:this.state.condition,
      material:this.state.material,
      image:this.state.uploadedCloudinaryURL
    }
   

      $.ajax({
        url: '/api/itemForm',
   //     dataType: 'json',
        type: 'POST',
        data: itemData,
        success: function(data) {
            alert("your post is now live")
        },
        error: function(err){
          console.log('errror in ajax', err);
        }
      });
    

  };



  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);
    upload.end((err, res) => {
      if (err) console.log(err);
      if (res.body.url !== '') {
        this.setState({
          uploadedCloudinaryURL: res.body.url
        });
      }
    });
  }

//form to collect data
    render () {
      const { name, description, category, subcategory, cost, condition, material } = this.state;
      const buttonEnabled = name.length > 0 && description.length > 0 && category.length > 0 && subcategory.length > 0 
                            && cost.length > 0 && condition.length > 0 && material.length > 0;
      return (
        <div id="formBack">
          <div className="container" id="form">
            <div className="ItemForm">




                <h1>The Black Smith Post</h1>
                <form accept="image/gif,image/jpeg">
                  <div className="form-groups">
                    <label>Item Name</label>
                      <input
                        className="form-control"
                        name="name"
                        type="string"
                        value={this.state.name}
                        onChange={e => this.change(e)}
                        placeholder="Name of your product..."

                      />
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                      <select
                        className="form-control"
                        name="category"
                        value={this.state.category}
                        onChange={e => this.change(e)}
                      >

                        <option>Select one...</option>
                        <option>Weapon</option>
                        <option>Armor</option>
                      </select>
                    {this.state.category === "Weapon" &&
                      <select className="form-control"
                       name="subcategory"
                       value={this.state.subcategory}
                       onChange={e => this.change(e)}
                       >
                         <option className="text-danger">Select weapon type</option>
                         <option>Sword</option>
                         <option>Spear</option>
                         <option>Axe</option>
                         <option>Other</option>
                      </select>
                    }
                    {this.state.category === "Armor" &&
                      <select className="form-control"
                       name="subcategory"
                       value={this.state.subcategory}
                       onChange={e => this.change(e)}
                       >
                         <option className="text-danger">Select armor type</option>
                         <option>Helmet</option>
                         <option>Suit</option>
                         <option>Shield</option>
                         <option>Other</option>
                      </select>
                    }
                  </div>


                  <div className="form-group">

                    <label>Description</label>
                      <textarea className="form-control"
                      name="description"
                      type="string"
                      value={this.state.description}
                      onChange={e => this.change(e)}
                      rows="4"
                      placeholder="Describe what you are selling...">
                      </textarea>
                  </div>

                  <div className="form-row">
                    <div className="input col-md-6">

                      <label>Price</label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                        <input className="form-control"
                        name="cost"
                        type="number"
                        value={this.state.cost}
                        onChange={e => this.change(e)}
                        placeholder="Ex. 12.99"/>
                      </InputGroup>
                    </div>

                    <div className="form-group col-md-6">

                      <label>Condition</label>
                        <select className="form-control"
                        name="condition"
                        value={this.state.condition}
                        onChange={e => this.change(e)}>
                          <option>Select one...</option>
                          <option>Pristine</option>
                          <option>Good</option>
                          <option>Fair</option>
                          <option>Terrible</option>
                        </select>
                    </div>
                  </div>

                  <div className="form-group">

                    <label>Material</label>
                      <select className="form-control"
                      name="material"
                      value={this.state.material}
                      onChange={e => this.change(e)}>
                        <option>Select one...</option>
                        <option>Iron</option>
                        <option>Steel</option>
                        <option>Leather</option>
                        <option>Vibranium</option>
                        <option>Paper</option>
                        <option>Other</option>
                      </select>
                  </div>

                  <div className="form-group col-md-6 FileUpload">
                    <label>Image</label>
                      <input className="form-control-file" name="image" type="file" aria-describedby="fileHelp" value={this.state.image}
                      onChange={e => this.change(e)} />
                        <small id="fileHelp" className="form-text text-muted">Upload an Image</small>


                      <div>
                        <Dropzone
                          multiple={false}
                          accept="image/*"
                          onDrop={this.onImageDrop}
                        >
                          <p>Drop an image or click to select a file to upload</p>
                        </Dropzone>
                      </div>
                      <div>
                        {this.state.uploadedCloudinaryURL === '' ? null:
                        <div>
                          <p>{this.state.uploadedFile.name} has been submited. Thank you</p>
                        </div>}
                      </div>

                  </div>

                  <div>
                    {!buttonEnabled &&
                    <div>  
                    <Button className="btn btn-dark btn-lg btn-block" onClick={this.toggle} disabled>List thee item my lord</Button>
                      <FormText color="muted" style={{textAlign:'center'}}>Please complete all fields before submitting</FormText></div>}
                    {buttonEnabled && 
                    <Button className="btn btn-dark btn-lg btn-block" onClick={this.toggle}>List thee item my lord</Button>}  
                      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
                          <ModalBody>
                            <ul>Item name: {this.state.name}</ul>
                            <ul>Category: {this.state.category}</ul>
                            <ul>Description: {this.state.description}</ul>
                            <ul>Price: {this.state.cost}</ul>
                            <ul>Condition: {this.state.condition}</ul>
                            <ul>Material: {this.state.material}</ul>
                            <Media object data-src={this.state.image} alt="Generic placeholder image" />
                          </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={this.onSubmit}>Forge sumbmission</Button>{' '}
                          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>





        );
      };
  };



export default ItemForm;








