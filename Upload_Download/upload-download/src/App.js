import React, {useState} from 'react';
import './App.css';

const FileHandlingApp =() => {
  const [file, setFile] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setShowPreview(false);
  };
  const handleFileUpload = () => {
    if (file) {
      console.log('File uploading:', file);
      setShowPreview(true);
    } else {
      console.log('Please select a first.');
    }
  };
  const handleFileDownload = () => {
    if (file) {
      const blob = new Blob([file], { type: file.type});
      const url= URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href=url;
      link.download=file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log('No file to download.');
    }
  };
  return (
    <div className='container'>
      <h1 style={{borderBottom: '2px solid red', paddingBottom:'10px', marginBottom:'20px',color:'indigo'}}>File Handling App</h1>
      <input type='file' onChange={handleFileChange}/>
      <br />
      <button onClick={handleFileUpload}>Upload File</button>
      <button onClick={handleFileDownload}>Download File</button>
      {showPreview && (
        <div>
          <h3>File Preview</h3>
          {file.type.startsWith('image/')? (
            <img 
            src={URL.createObjectURL(file)}
            alt='File Preview'
            style={{ maxWidth:'300px', maxHeight:'300px', border:'1px solid #ddd'}}/>

          ):(
            <iframe 
            title='file-preview'
            style={{ width:'100px', height:'300px', border:'1px solid #ddd'}}
            src={URL.createObjectURL(file)} 
            />
          )}
        </div>
      )}
      <div className='watermark'>
        <p>Nihith</p>
      </div>
      </div>
  );
};

export default FileHandlingApp;