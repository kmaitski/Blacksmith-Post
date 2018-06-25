import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
const CLOUDINARY_UPLOAD_PRESET = 'vdivzjz5';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dwid55cj4/upload';

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedCloudinaryUrl: '',
      uploadedFiles: {}
    };
    this.onImageDrop = this.onImageDrop.bind(this);
  }

  onImageDrop(files) {
    console.log(files);
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);
    upload.end((err, res) => {
      if (err) console.log(err);
      console.log(res.body);
      if (res.body.url !== '') {
        this.setState({
          uploadedCloudinaryUrl: res.body.url
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="FileUpload">
          <Dropzone multiple={false} accept="image/*" onDrop={this.onImageDrop}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
        <div>
          {this.state.uploadedCloudinaryUrl === '' ? null : (
            <div>
              <p>{this.state.uploadedFile.name}</p>
              <img src={this.state.uploadedCloudinaryUrl} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ImageUploader;
