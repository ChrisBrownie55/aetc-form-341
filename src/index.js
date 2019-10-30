import React, { useState, useCallback, useMemo } from "react";
import ReactDOM from "react-dom";

import Form341 from "./components/Form341";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { PAPER_341_WIDTH, PAPER_341_HEIGHT } from "./constants";
import "./styles.css";

function useInput({ initialValue = "", ...props }) {
  const [value, setValue] = useState(initialValue);
  const handleChange = useCallback(event => setValue(event.target.value), [
    setValue
  ]);

  return [
    value,
    setValue,
    <TextField
      variant="outlined"
      value={value}
      onChange={handleChange}
      className="Input"
      {...props}
    />
  ];
}

function printForm() {
  const dataURL = document.querySelector("canvas").toDataURL("image/png");
  const windowHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
      </head>
      <body style="margin: 0;">
        <img src="${dataURL}" style="width: 100vh; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(90deg);" />
      </body>
    </html>
  `;

  const printWindow = window.open(
    "",
    "",
    `width=${PAPER_341_WIDTH},height=${PAPER_341_HEIGHT}`
  );
  printWindow.document.open();
  printWindow.document.write(windowHTML);

  setTimeout(() => {
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, 100);
}

function App() {
  const [name, , nameInput] = useInput({
    placeholder: "Smith John A",
    id: "full-name",
    label: "Full Name"
  });
  const [grade, , gradeInput] = useInput({
    placeholder: "E-4",
    id: "grade",
    label: "Grade"
  });
  const [organization, , organizationInput] = useInput({
    placeholder: "123 TRS, Bldg 4567, Room D410",
    id: "organization",
    label: "Organization"
  });
  const [flight, , flightInput] = useInput({
    placeholder: "DOD",
    id: "flight",
    label: "Class/Flight"
  });

  const formData = useMemo(() => ({ name, grade, organization, flight }), [
    name,
    grade,
    organization,
    flight
  ]);

  return (
    <Grid container className="App">
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" className="App__title">
              AETC Form 341 Builder
            </Typography>
          </Grid>
          <Grid item>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} sm={6}>
                {nameInput}
              </Grid>
              <Grid item xs={12} sm={6}>
                {gradeInput}
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} sm={6}>
                {organizationInput}
              </Grid>
              <Grid item xs={12} sm={6}>
                {flightInput}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Form341 formData={formData} />
        <Button
          onClick={printForm}
          variant="contained"
          color="primary"
          className="App__print-button"
        >
          Print
        </Button>
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
