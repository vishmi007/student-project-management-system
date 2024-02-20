import React, { useState } from "react";
import "./TemplateCard.css";
import { useNavigate } from "react-router-dom";

const Templates = (props) => {
  const [tempSelectionText, setTempSelectionText] = useState(props.TempSelection);
  const [isCardClicked, setIsCardClicked] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    setTempSelectionText('Selected');
    setIsCardClicked(true);

    setTimeout(() => {
        if (props.TempName === "Milestone") {
            navigate("/lecturer/projects/create-project/templates/milestone-submission");
          } else if (props.TempName === "Single Submission") {
            navigate("/lecturer/projects/create-project/templates/single-submission");
          }
        }, 700);
  };

  const tempSelectionContainerStyle = {
    backgroundColor: isCardClicked ? '#C7FFC6' : '#DFF0FF',
    color: isCardClicked ? 'green' : '#005EB4',
  };

return (
    <div className="Templates">
      <div className="TempCard" onClick={handleCardClick}>
      <img src={props.Image} alt='template-img' className='TemplateImage'></img>
        <div className="TempCard_content">
          <h3 className="TempName">{props.TempName}</h3>
          <div className="TempDescription">{props.TempDescription}</div>
          <div className="TempSelectionContainer" style={tempSelectionContainerStyle}>
             <div className="TempSelection" style={{ color: tempSelectionContainerStyle.color }}>{tempSelectionText}</div>          
          </div>         
        </div>
      </div>
    </div>
  );
};

export default Templates; 
