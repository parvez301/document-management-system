import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Cookies from "js-cookie";
import request from "superagent";

class UploadFile extends Component {
    constructor(props){
      super(props);
      this.onDrop = this.onDrop.bind(this);
      this.showFiles = this.showFiles.bind(this);
      this.uploadFiles = this.uploadFiles.bind(this);
      this.state = {
        files: [],
      }
    }
    onDrop(files) {
      console.log('Received files: ', files);
      this.setState({
        files: files
      });
    }
    showFiles() {
      const files = this.state.files || null;
      console.log('files',files);
      if (!files.length) {
          return null;
      }
      return (
          <div>
              <h3>Dropped files: </h3>
              <ul className="gallery">
                  {
                      files.map((file, idx) => {
                          return (
                              <li className="col-md-3" key={idx}>
                                  <img src={file.preview} width={100}/>
                                  <div>{file.name}</div>
                              </li>
                          );
                      })
                  }
              </ul>
          </div>
      );
  }
  uploadFiles() {
    let req = request.post('http://localhost:8000/doqman/file-upload/');
    let files = [];
    files = new FormData();
    let that = this;
    let index;
    let csrftoken = Cookies.get("X-CSRF");
    for (index = 0; index < that.state.files.length; ++index) {
        console.log(that.state.files[index]);
        files.append('files',that.state.files[index]);
    }
    req.send(files);
    console.log('req is',req);
    req.end((err, res) => {
      if (err) {
        console.log('error', err);
      } else {
        console.log('success', res);

      }
    });
  }   
  render(){
    return(
      <div className="col-md-12">
        <form method="post" encType="multipart/form-data">
              <Dropzone onDrop={this.onDrop}>
                Try dropping some files here, or click to select files to upload.
            </Dropzone>
        </form>
        {this.showFiles()}
      <button onClick={this.uploadFiles}>Upload</button>
    </div>
    );
  }
}

export default UploadFile;
