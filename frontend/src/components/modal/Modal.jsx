import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "react-toastify";
import "./Modal.css";

const MAX_SELECTED_FILES = 3

const Modal = ({ isOpen, onClose, onFileSelect, endpoint, callerId, currentMilestone }) => {
  const axiosPrivate = useAxiosPrivate();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
    
    useEffect(() => {
      if (!isOpen) {
        setSelectedFileNames([]);
      }
    }, [isOpen]);

    
  if (!isOpen) return null;

  
  const handleDrop = (e) => {
    e.preventDefault();
    onFileSelect(e.dataTransfer.files);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    onFileSelect(files);

    setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...Array.from(files)]);
    const fileNames = Array.from(files).map((file) => file.name);
    setSelectedFileNames((prevNames) => [...prevNames, ...fileNames]);
  };
  
  const notifySuccess = () =>
    toast.success("Files saved successfully!", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Failed to save files. Please try again.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleUpload = async () => {    
    try {
      console.log("MilestoneNAME: ", currentMilestone)
      const formData = new FormData();
      formData.append("projectId", localStorage.getItem("projectId"));
      if (endpoint === "lecturer/projects/create-project/templates/milestone-submission/upload" && currentMilestone) 
      {
        formData.append("milestoneName", currentMilestone);
      }
      formData.append("callerId", callerId);
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
      }
      const config = {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      };
      console.log("caller ID in Modal: ", callerId);
    const response = await axiosPrivate.post(endpoint, formData, config);

      if (response.status === 200) {
        notifySuccess();
        console.log("Files saved successfully!");
      } else {
        console.error("Failed to send data to the backend");
        notifyError();
      }

    } catch (error) {
      console.error("Error:", error);
      notifyError();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <h4>Upload</h4>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="upload-container">
          <div
            className="upload-zone"
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <img src={`${process.env.PUBLIC_URL}/images/UploadIcon.png`} alt="icon" />         
            <h2>Drag and Drop or <label htmlFor="fileInput">Browse</label></h2>
            <p>Supported Formats: JPEG, PNG, MP4, GIF, PDF, PSD, Word, PPT</p>
            <input 
            type="file" 
            id="fileInput" 
            name="files"
            accept=".jpeg, .jpg, .png, .gif, .mp4, .pdf, .psd, .doc, .docx, .ppt, .pptx" 
            multiple 
            onChange={handleFileSelect} 
            onClick={(e) => {
              if (selectedFileNames.length >= MAX_SELECTED_FILES) {
                e.preventDefault();
                alert(`You can only select up to ${MAX_SELECTED_FILES} files.`);
              }
            }}/>          
          </div>
        </div>

        {isOpen && selectedFileNames.length > 0 && (
          <div>
            <ul>
              {selectedFileNames.map((fileName, index) => (
                <li key={index}>{fileName}</li>
              ))}
            </ul>
          </div>
        )}

        <p>Uploading - {selectedFileNames.length} files</p>
        <div className="UploadFileContainer">
        <button onClick={handleUpload}>UPLOAD FILES</button>
        </div>      
      </div>
    </div>
  );
};

export default Modal;