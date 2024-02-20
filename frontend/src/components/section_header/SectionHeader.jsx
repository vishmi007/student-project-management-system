import React from "react";
import Button from "../btns/Button";

export default function SectionHeader({
  title,
  desc,
  btnColor,
  btnLabel,
  btnHandler,
}) {
  const displayBtn = btnLabel && btnHandler && btnColor;
  return (
    <div>
      <section className='pt-3 d-flex justify-content-between'>
        <div>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
        {displayBtn && (
          <Button
            color={btnColor}
            labelText={btnLabel}
            onClickHandler={btnHandler}
          ></Button>
        )}
      </section>
    </div>
  );
}
