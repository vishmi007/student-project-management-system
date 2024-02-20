import React from "react";
import "./SectionDivider.css";

export default function PageDivider({ title }) {
  return (
    <div>
      <div>
        <h2 className='pt-5'>{title}</h2>
        <div className='section-divider mt-2'></div>
      </div>
    </div>
  );
}
