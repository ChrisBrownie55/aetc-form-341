import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import Form341 from './components/Form341';
import { PAPER_341_WIDTH, PAPER_341_HEIGHT } from './constants';

function useInput({ initialValue = '', ...props }) {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(event => setValue(event.target.value), [
    setValue
  ]);

  return [
    value,
    setValue,
    <input type="text" value={value} onChange={handleChange} {...props} />
  ];
}

function printForm() {
  const dataURL = document.querySelector('canvas').toDataURL('image/png');
  const windowHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>AETC Form 341</title>
      </head>
      <body style="margin: 0;">
        <img src="${dataURL}" style="width: 100vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg);" />
      </body>
    </html>
  `;

  const printWindow = window.open(
    '',
    '',
    `width=${PAPER_341_WIDTH},height=${PAPER_341_HEIGHT}`
  );
  printWindow.document.open();
  printWindow.document.write(windowHTML);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function App() {
  const [name, setName, nameInput] = useInput({ placeholder: 'Smith John A' });
  const [grade, setGrade, gradeInput] = useInput({ placeholder: 'E-4' });
  const [organization, setOrganization, organizationInput] = useInput({
    placeholder: '123 TRS, Bldg 4567, Room D410'
  });
  const [flight, setFlight, flightInput] = useInput({ placeholder: 'DOD' });

  const formData = useMemo(() => ({ name, grade, organization, flight }), [
    name,
    grade,
    organization,
    flight
  ]);

  return (
    <div className="App">
      {nameInput}
      {gradeInput}
      {organizationInput}
      {flightInput}
      <Form341 formData={formData} />
      <button onClick={printForm}>Print</button>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
