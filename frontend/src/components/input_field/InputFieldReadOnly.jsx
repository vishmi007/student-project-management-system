import React, { useState } from "react";
import "./InputFieldReadOnly.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { ButtonToolbar, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function InputFieldReadOnly({ label, value, type }) {
  const fieldSize = type === "link" ? "input-field-read-only-link-size" : "";
  const [tooltipText, setTooltipText] = useState("Copy to Clipboard");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setTooltipText("Copied to Clipboard");
  };

  const tooltip = <Tooltip id='tooltip'>{tooltipText}</Tooltip>;

  return (
    <div>
      <label className='mb-3'>{label}</label>
      <div className='d-flex align-items-center'>
        <input
          className={`input-field-read-only ${fieldSize}`}
          type='text'
          value={value}
          readOnly
        />
        <ButtonToolbar>
          <OverlayTrigger placement='top' overlay={tooltip} delay={200}>
            <div
              className='input-field-read-only-copy-btn p-3 rounded-3 ms-3'
              onClick={copyToClipboard}
            >
              <FontAwesomeIcon icon={faCopy} size='lg' />
            </div>
          </OverlayTrigger>
        </ButtonToolbar>
      </div>
    </div>
  );
}
