import React, {useState} from "react";
import "./FileUploader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "../modal/Modal";

export default function FileUploader({endpoint, currentMilestone}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [callerId, setCallerId] = useState("");

  const route = endpoint === "lecturer/projects/create-project/templates/single-submission/upload"
    ? "single-submission/upload"
    : endpoint === "lecturer/projects/create-project/templates/milestone-submission/upload"
    ? "milestone-submission/upload"
    : ""; 

  const openModal = (e) => {
    setIsModalOpen(true); 
    console.log("ID: ", e.target.id);
    // Update the URL when the modal is opened
    if (route) {
      window.history.pushState(null, "", route);
    }
    setCallerId(e.target.id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFileNames([]);
  };

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files);
    setSelectedFiles(newFiles);
    const newFileNames = newFiles.map((file) => file.name);
    setSelectedFileNames((prevNames) => [...prevNames, ...newFileNames]);
    console.log("caller ID in fileuploader: ", callerId);
  };
  
  return (
    <div>
      <div className='d-flex mb-3 align-items-baseline'>

        <button id="project-files" className={`file-uploader-btn`} onClick={openModal}>
          Attach Project Files{" "}
          <span className='ms-2'>
            <FontAwesomeIcon icon={faPaperclip} />
          </span>
        </button>

        <div className='d-flex flex-wrap ms-3'>
        {selectedFileNames.map((fileName, index) => (
            <p className='file-uploader-tags mx-1 p-2 px-3' key={index}>
              {fileName}{" "}
              <span className='ps-3'>
                <FontAwesomeIcon icon={faXmark} />
              </span>
            </p>
          ))}
        </div>
      </div>
      <div className='d-flex align-items-baseline'>
        <button id="rubric" className={`file-uploader-btn`} onClick={openModal}>
          Attach Rubric{" "}
          <span className='ms-2'>
            <FontAwesomeIcon icon={faPaperclip} />
          </span>
        </button>

        <div className='d-flex ms-3'>
          <p className='file-uploader-tags mx-1 p-2 px-3'>
            starter.py{" "}
            <span className='ps-3'>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </p>
        </div>
      </div>
      <p className='mt-3'>
        Only evaluators will be able to view the rubric file.
      </p>
      {endpoint === "lecturer/projects/create-project/templates/milestone-submission/upload" ? (
        <Modal
        endpoint={endpoint}
          isOpen={isModalOpen}
          onClose={closeModal}
          onFileSelect={handleFileSelect}
          callerId={callerId}
          currentMilestone={currentMilestone.submissionName}
        >
          <button onClick={closeModal}>Close</button>
        </Modal>
      ) : (
        <Modal
        endpoint={endpoint}
          isOpen={isModalOpen}
          onClose={closeModal}
          onFileSelect={handleFileSelect}
          callerId={callerId}
        >
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}