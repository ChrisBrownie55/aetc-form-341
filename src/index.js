import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";

import Form341 from "./components/Form341";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useMachine } from "@xstate/react";
import { MTLMachine } from "./mtl-machine";

import { PAPER_341_WIDTH, PAPER_341_HEIGHT } from './constants';
import './styles.css';

function useInput({ initialValue = '', ...props }) {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    setValue,
    <TextField
      variant="outlined"
      value={value}
      onChange={event => setValue(event.target.value)}
      className="Input"
      {...props}
    />
  ];
}

function printForm() {
  const dataURL = document.querySelector('canvas').toDataURL('image/png');
  const windowHTML = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=yes"
        />
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

  setTimeout(() => {
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  }, 100);
}

function App() {
  const [name, , nameInput] = useInput({
    placeholder: 'Smith John A',
    id: 'full-name',
    label: 'Full Name'
  });
  const [grade, , gradeInput] = useInput({
    placeholder: 'E-4',
    id: 'grade',
    label: 'Grade'
  });
  const [organization, , organizationInput] = useInput({
    placeholder: '123 TRS, Bldg 4567, Room D410',
    id: 'organization',
    label: 'Organization'
  });
  const [flight, , flightInput] = useInput({
    placeholder: 'DOD',
    id: 'flight',
    label: 'Class/Flight'
  });

  const [mtlState, send] = useMachine(MTLMachine);

  const formData = useMemo(
    () => ({ name, grade, organization, flight, mtlState }),
    [name, grade, organization, flight, mtlState]
  );

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
          <Grid item>
            <Grid container justify="center" spacing={3}>
              <Grid item xs={12} sm={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={mtlState.matches('on')}
                      onChange={() => send('TOGGLE')}
                      color="primary"
                    />
                  }
                  label={
                    mtlState.matches('on')
                      ? 'Hide MTL'
                      : 'Show MTL'
                  }
                />
              </Grid>
              <Grid item xs={6} sm={5}>
                {mtlState.matches('on') && (
                  <TextField
                    variant="outlined"
                    label="MTL"
                    placeholder="SSgt Doe"
                    value={mtlState.context.mtl}
                    onChange={event => {
                      send({ type: 'UPDATE_MTL', mtl: event.target.value })
                    }}
                    className="Input"
                  />
                )}
              </Grid>
              <Grid item xs={6} sm={3}>
                {mtlState.matches('on') && (
                  <TextField
                    variant="outlined"
                    label="Phase"
                    placeholder="VI"
                    value={mtlState.context.transitionPhase}
                    onChange={event => {
                      send({
                        type: 'UPDATE_TRANSITION_PHASE',
                        transitionPhase: event.target.value
                      });
                    }}
                  />
                )}
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

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
