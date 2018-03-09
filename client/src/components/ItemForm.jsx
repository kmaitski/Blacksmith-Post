import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Dropzone from 'react-dropzone';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'vdivzjz5';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwid55cj4/upload';



class ItemForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      class:'',
      name: '',
      category: '',
      subcategory: '',
      description:'',
      cost: '',
      email:'',
      condition:'',
      blacksmith:'',
      material:'',
      image:'',
      uploadedFile: {},
      uploadedCloudinaryURL: ''
    };
    this.change = this.change.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onImageDrop = this.onImageDrop.bind(this);
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
<<<<<<< HEAD
    if (itemData.name && itemData.description && itemData.category && itemData.subcategory && itemData.cost && itemData.condition && itemData.material) {
=======
    console.log(itemData.image);
    if (itemData.name && itemData.description && itemData.category && itemData.cost && itemData.condition && itemData.material) {
>>>>>>> 8b463af7b75b5e37d3870cc267e81acee9e18c46

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
    } else {
      alert("Please complete the items in red");

    }

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
      return (
        <div id="formBack">
          <div className="container" id="form">
            <div className="ItemForm">

                <h1>The Black Smith Post</h1>
                <form accept="image/gif,image/jpeg">
                  <div className="form-groups">
                    {this.state.name &&
                    <label className="text-success">Item Name</label>}
                    {!this.state.name &&
                    <label className="text-danger">Item Name</label>}
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
                    {this.state.category &&
                    <label className="text-success">Category</label>}
                    {!this.state.category &&
                    <label className="text-danger">Category</label>}
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
                    {this.state.description &&
                    <label className="text-success">Description</label>}
                    {!this.state.description &&
                    <label className="text-danger">Description</label>}
                      <textarea
                        className="form-control"
                        name="description"
                        type="string"
                        value={this.state.description}
                        onChange={e => this.change(e)}
                        rows="4"
                        placeholder="Describe what you are selling..."
                      />
                  </div>
                  <div className="form-row">
                    <div className="input col-md-6">
                      {this.state.cost &&
                      <label className="text-success">Price</label>}
                      {!this.state.cost &&
                      <label className="text-danger">Price</label>}
                        <input
                          className="form-control"
                          name="cost"
                          type="number"
                          value={this.state.cost}
                          onChange={e => this.change(e)}
                          placeholder="Ex. 12.99"
                        />
                    </div>
                    <div className="form-group col-md-6">
                      {this.state.condition &&
                      <label className="text-success">Condition</label>}
                      {!this.state.condition &&
                      <label className="text-danger">Condition</label>}
                        <select
                          className="form-control"
                          name="condition"
                          value={this.state.condition}
                          onChange={e => this.change(e)}
                        >
                          <option>Select one...</option>
                          <option>Pristine</option>
                          <option>Good</option>
                          <option>Fair</option>
                          <option>Terrible</option>
                        </select>
                    </div>
                  </div>
                  <div className="form-group">
                    {this.state.material &&
                    <label className="text-success">Material</label>}
                    {!this.state.material &&
                    <label className="text-danger">Material</label>}
                        <select
                          className="form-control"
                          name="material"
                          value={this.state.material}
                          onChange={e => this.change(e)}
                        >
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
                    {this.state.image &&
                    <label className="text-success">Image</label>}
                    {!this.state.image &&
                    <label className="text-danger">Image</label>}
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
                  <button className="btn btn-dark btn-lg btn-block" onClick={this.onSubmit}>List thee item my lord</button>
                </form>
              </div>
            </div>
          </div>

        );
      };
  };



export default ItemForm;








