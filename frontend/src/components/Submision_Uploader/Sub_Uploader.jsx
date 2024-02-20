import React, {useState} from "react";
import "./Sub_Uploader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalStudents from "../modelStudents/ModalStudents";

export default function SubmissionUploader({subName}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const uploadEndPoint = "/student/submision/upload";
  const type = localStorage.getItem("type");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files);
    setSelectedFiles(newFiles);
    const newFileNames = newFiles.map((file) => file.name);
    setSelectedFileNames((prevNames) => [...prevNames, ...newFileNames]);
  };

  return (
    <div>
      <div className='d-flex mb-3 align-items-baseline'>

        <button className={`file-uploader-btn`} onClick={openModal}>
          Add new project File{" "}
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
      {type === "milestone-submision"?(
        <ModalStudents isOpen={isModalOpen} onClose={closeModal} onFileSelect={handleFileSelect} currentMilestone={subName} endpoint={uploadEndPoint} callerId={localStorage.getItem("type")} projectID={localStorage.getItem("projectID")} teamNo={localStorage.getItem("team")} > 
        <button onClick={closeModal}>Close</button>
        </ModalStudents>
      ):(
        <ModalStudents isOpen={isModalOpen} onClose={closeModal} onFileSelect={handleFileSelect} currentMilestone={""} endpoint={uploadEndPoint} callerId={localStorage.getItem("type")} projectID={localStorage.getItem("projectID")} teamNo={localStorage.getItem("team")} > 
        <button onClick={closeModal}>Close</button>
        </ModalStudents>
      )}
      
    </div>
  );
}

