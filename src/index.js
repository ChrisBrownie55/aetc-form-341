import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import Form341 from './components/Form341';

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
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
