/*
 * FILE: EnrollmentHeader.js
 * AUTHOR: Hewathilaka Gaveen Hesara Jayamanna [ID: 20514853]
 * UNIT: Capstone Computing Project 2 ISAD3001
 * PURPOSE: Contains Header for student enrollment pages
 * REFERENCE: None
 * LAST MOD: 07/08/2023
 */
import React from "react";

export function EnrollmentHeader({ title, desc }) {
  return (
    <div>
      <section className="pt-3 d-flex justify-content-center">
        <div className="col-xs-1 text-center">
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </section>
    </div>
  );
}
