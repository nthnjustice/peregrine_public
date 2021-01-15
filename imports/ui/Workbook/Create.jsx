import React, { useState, useReducer, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import Papa from 'papaparse';
import moment from 'moment-timezone';
import MomentUtils from "@date-io/moment";
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import ChipInput from 'material-ui-chip-input';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Mapbox from '../Mapbox';

moment.tz.setDefault('UTC');

const stepLabels = [
  'Description',
  'Temporal Bounds',
  'ICAO Watchlist',
  'Areas of Interest',
  'Source/Destination'
];

const inputState = {
  value: '',
  error: false,
  helperText: ''
};

const inputReducer = (state, action) => {
  switch(action.type) {
    case 'updateValue':
      return {...state, value: action.value};
    case 'updateError': 
      return {...state, error: action.error};
    case 'updateHelperText':
      return {...state, helperText: action.helperText};
    default:
      return state;
  }
};

const useStyles = makeStyles({
  wrapper: {
    marginTop: '2rem'
  },
  uploadWrapper: {
    marginTop: '1.5rem'
  },
  radioWrapper: {
    margin: '1.5rem'
  },
  noTopPadding: {
    paddingTop: '0px'
  },
  spacer: {
    paddingTop: '2rem'
  },
  footer: {
    marginTop: '3rem'
  }
});

export default function Create(props) {
  const styles = useStyles();
  const [step, setStep] = useState(0);
  const [title, setTitle] = useReducer(inputReducer, inputState);
  const [author, setAuthor] = useReducer(inputReducer, inputState);
  const [details, setDetails] = useReducer(inputReducer, inputState);
  const [fromDate, setFromDate] = useReducer(inputReducer, inputState);
  const [fromEpoch, setFromEpoch] = useReducer(inputReducer, inputState);
  const [toDate, setToDate] = useReducer(inputReducer, inputState);
  const [toEpoch, setToEpoch] = useReducer(inputReducer, inputState);
  const [icaoFile, setIcaoFile] = useState([]);
  const [icaoChips, setIcaoChips] = useState([]);
  const [areas, setAreas] = useState(null);
  const [source, setSource] = useState('any');
  const [sourceFile, setSourceFile] = useState([]);
  const [sourceChips, setSourceChips] = useState([]);
  const [destination, setDestination] = useState('any');
  const [destinationFile, setDestinationFile] = useState([]);
  const [destinationChips, setDestinationChips] = useState([]);

  const fileStates = {
    icaoFile,
    sourceFile,
    destinationFile
  };

  const dispatchers = {
    title: setTitle,
    author: setAuthor,
    details: setDetails,
    fromDate: setFromDate,
    fromEpoch: setFromEpoch,
    toDate: setToDate,
    toEpoch: setToEpoch
  };

  useEffect(() => {
    let date = moment.utc();

    setFromDate({type: 'updateValue', value: date});
    setFromEpoch({type: 'updateValue', value: date.valueOf()});
    setToDate({type: 'updateValue', value: date});
    setToEpoch({type: 'updateValue', value: date.valueOf()});
  }, []);

  const handleChangeInput = (input, value) => {
    dispatchers[input]({type: 'updateValue', value});
    dispatchers[input]({type: 'updateError', error: false});
    dispatchers[input]({type: 'updateHelperText', helperText: ''});

    if (input === 'fromDate' || input === 'fromEpoch' || input === 'toDate' || input === 'toEpoch') {
      setFromEpoch({type: 'updateError', error: false});
      setFromEpoch({type: 'updateHelperText', helperText: ''});
      setToDate({type: 'updateError', error: false});
      setToEpoch({type: 'updateError', error: false});
      setToEpoch({type: 'updateHelperText', helperText: ''});

      if (input === 'fromDate') {
        setFromEpoch({type: 'updateValue', value: value.valueOf()});
      } else if (input === 'fromEpoch') {
        setFromDate({type: 'updateValue', value: moment(Number(value))});
      } else if (input === 'toDate') {
        setToEpoch({type: 'updateValue', value: value.valueOf()});
      } else if (input === 'toEpoch') {
        setToDate({type: 'updateValue', value: moment(Number(value))});
      }
    }
  };

  const handleUploadFile = (input, data) => {
    let array = fileStates[input];

    data.slice(1, -1).map(elem => {
      array.push(elem[0]);
    });
    
    let update = [...new Set(array)];

    if (input === 'icaoFile') {
      setIcaoFile(update);
    } else if (input === 'sourceFile') {
      setSourceFile(update);
    } else if (input === 'destinationFile') {
      setDestinationFile(update);
    }
  };

  const isStepValid = required => {
    let isValid = true;

    Object.keys(required).map(input => {
      if (required[input].value === '') {
        isValid = false;
        dispatchers[input]({type: 'updateError', error: true});
        dispatchers[input]({type: 'updateHelperText', helperText: `can't be blank`});
      } else if (input === 'fromEpoch' && !moment(Number(required[input].value))._isValid) {
        isValid = false;
        setFromEpoch({type: 'updateError', error: true});
        setFromEpoch({type: 'updateHelperText', helperText: 'invalid epoch'});
      } else if (input === 'toEpoch' && !moment(Number(required[input].value))._isValid) {
        isValid = false;
        setToEpoch({type: 'updateError', error: true});
        setToEpoch({type: 'updateHelperText', helperText: 'invalid epoch'});
      } else if (input === 'toEpoch' && toEpoch.value - fromEpoch.value <= 0) {
        isValid = false;
        setToDate({type: 'updateError', error: true});
        setToEpoch({type: 'updateError', error: true});
        setToEpoch({type: 'updateHelperText', helperText: 'must be later than From Epoch'});
      }
    });

    return isValid;
  };

  const handleClickNext = () => {
    const validateStep = required => {
      if (isStepValid(required)) {
        setStep(step + 1);
      }
    };

    if (step === 0) {
      validateStep({title});
    } else if (step === 1) {
      validateStep({fromDate, fromEpoch, toDate, toEpoch});
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmitForm = () => {
    const mergeArrays = (a, b) => {
      return a.concat(b.filter(elem => a.indexOf(elem) < 0));
    };

    let workbook = {
      title: title.value,
      author: author.value,
      details: details.value,
      fromEpoch: fromEpoch.value,
      toEpoch: toEpoch.value,
      icaos: mergeArrays(icaoChips, icaoFile),
      areas,
      sources: (source != 'specified' ? source : mergeArrays(sourceChips, sourceFile)),
      destinations: (destination != 'specified' ? destination : mergeArrays(destinationChips, destinationFile))
    };

    Meteor.call('workbooks.insert', workbook, error => {
      if (!error) {
        props.onChangeTab(1)
      } else {
        setTitle({type: 'updateError', error: true});
        setTitle({type: 'updateHelperText', helperText: 'title already exists'});
        setStep(0);
      }
    });
  };

  return(
    <Grid container className={styles.wrapper} justify="center">
      <Grid item xs={12}>
        <Stepper activeStep={step} alternativeLabel>
          {stepLabels.map(label => {
            return(
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {step === 0 &&
          <Grid container className={styles.wrapper} spacing={4} justify="center">
            <Grid item xs={3}>
              <TextField
                fullWidth
                required
                variant="outlined"
                autoComplete="off"
                label="Title"
                value={title.value}
                error={title.error}
                helperText={title.helperText}
                onChange={event => handleChangeInput('title', event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                variant="outlined"
                autoComplete="off"
                label="Author"
                value={author.value}
                error={author.error}
                helperText={author.helperText}
                onChange={event => handleChangeInput('author', event.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                autoComplete="off"
                label="Details"
                value={details.value}
                error={details.error}
                helperText={details.helperText}
                onChange={event => handleChangeInput('details', event.target.value)}
              />
            </Grid>
          </Grid>
        }
        {step === 1 &&
          <Grid container className={styles.wrapper} spacing={10} justify="center">
            <Grid item xs={3}>
              <MuiPickersUtilsProvider moment={moment} utils={MomentUtils}>
                <DateTimePicker
                  fullWidth
                  required
                  inputVariant="outlined"
                  label="From GMT Date"
                  format="MMMM Do, YYYY hh:mm a"
                  value={fromDate.value}
                  onChange={date => handleChangeInput('fromDate', date)}
                  error={fromDate.error}
                  helperText={fromDate.helperText}
                />
              </MuiPickersUtilsProvider>
              <div className={styles.spacer}></div>
              <TextField
                fullWidth
                required
                variant="outlined"
                autoComplete="off"
                label="From UTC epoch milliseconds"
                value={fromEpoch.value}
                error={fromEpoch.error}
                helperText={fromEpoch.helperText}
                onChange={event => handleChangeInput('fromEpoch', event.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider moment={moment} utils={MomentUtils}>
                <DateTimePicker
                  fullWidth
                  required
                  inputVariant="outlined"
                  label="To GMT Date"
                  format="MMMM Do, YYYY hh:mm a"
                  value={toDate.value}
                  onChange={date => handleChangeInput('toDate', date)}
                  error={toDate.error}
                  helperText={toDate.helperText}
                />
              </MuiPickersUtilsProvider>
              <div className={styles.spacer}></div>
              <TextField
                fullWidth
                required
                variant="outlined"
                autoComplete="off"
                label="To UTC epoch milliseconds"
                value={toEpoch.value}
                error={toEpoch.error}
                helperText={toEpoch.helperText}
                onChange={event => handleChangeInput('toEpoch', event.target.value)}
              />
            </Grid>
          </Grid>
        }
        {step === 2 &&
          <Grid container className={styles.wrapper} spacing={4} justify="center">
            <Grid item xs={6}>
              <ChipInput
                fullWidth
                label="Aircraft ICAO"
                helperText="type aircraft ICAO and hit 'Enter'"
                defaultValue={icaoChips}
                onChange={chips => setIcaoChips(chips)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                className={styles.uploadWrapper}
                autoComplete="off"
                type="file"
                helperText="upload CSV with header row and aircraft ICAOs in the first column"
                onChange={event =>
                  Papa.parse(event.target.files[0], {
                    complete: file => handleUploadFile('icaoFile', file.data)
                  })
                }
              />
            </Grid>
          </Grid>
        }
        {step === 3 &&
          <Grid container className={styles.wrapper} justify="center">
            <Grid item xs={10}>
              <Mapbox
                id="map"
                container={{
                  height: 500,
                  width: '100%'
                }}
                basemap="satellite"
                zoomControl
                scaleControl
                drawControls={{
                  polygon: true,
                  trash: true
                }}
                drawings={areas}
                onDraw={drawings => setAreas(drawings)}
              />
            </Grid>
          </Grid>
        }
        {step === 4 &&
          <Grid container className={styles.wrapper} spacing={8} justify="center" align="center">
            <Grid item xs={5} className={styles.noTopPadding}>
              <Typography variant="h4">Source</Typography>
              <FormControl component="fieldset" className={styles.radioWrapper}>
                <RadioGroup
                  value={source}
                  row
                  onChange={event => setSource(event.target.value)}
                >
                  <FormControlLabel
                    value="any"
                    label="Any"
                    control={
                      <Radio color="primary"/>
                    }
                  />
                  <FormControlLabel
                    value="specified"
                    label="Specified"
                    control={
                      <Radio color="primary"/>
                    }
                  />
                  <FormControlLabel
                    value="unknown"
                    label="Unknown"
                    control={
                      <Radio color="primary"/>
                    }
                  />
                </RadioGroup>
              </FormControl>
              {source === 'specified' &&
                <>
                  <ChipInput
                    fullWidth
                    label="Airport ICAO"
                    helperText="type aircraft ICAO and hit 'Enter'"
                    defaultValue={sourceChips}
                    onChange={chips => setSourceChips(chips)}
                  />
                  <div className={styles.spacer}></div>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    type="file"
                    helperText="upload CSV with header row and ICAOs in the first column"
                    onChange={event =>
                      Papa.parse(event.target.files[0], {
                        complete: file => handleUploadFile('sourceFile', file.data)
                      })
                    }
                  />
                </>
              }
            </Grid>
            <Grid item xs={5} className={styles.noTopPadding}>
              <Typography variant="h4">Destination</Typography>
              <FormControl component="fieldset" className={styles.radioWrapper}>
                <RadioGroup
                  value={destination}
                  row
                  onChange={event => setDestination(event.target.value)}
                >
                  <FormControlLabel
                    value="any"
                    label="Any"
                    control={
                      <Radio color="primary"/>
                    }
                  />
                  <FormControlLabel
                    value="specified"
                    label="Specified"
                    control={
                      <Radio color="primary"/>
                    }
                  />
                  <FormControlLabel
                    value="unknown"
                    label="Unknown"
                    control={
                      <Radio color="primary"/>
                    }
                  />
                </RadioGroup>
              </FormControl>
              {destination === 'specified' &&
                <>
                  <ChipInput
                    fullWidth
                    label="Airport ICAO"
                    helperText="type aircraft ICAO and hit 'Enter'"
                    defaultValue={destinationChips}
                    onChange={chips => setDestinationChips(chips)}
                  />
                  <div className={styles.spacer}></div>
                  <TextField
                    fullWidth
                    autoComplete="off"
                    type="file"
                    helperText="upload CSV with a header row and ICAOs in the first column"
                    onChange={event =>
                      Papa.parse(event.target.files[0], {
                        complete: file => handleUploadFile('destinationFile', file.data)
                      })
                    }
                  />
                </>
              }
            </Grid>
          </Grid>
        }
      </Grid>
      <Grid container className={styles.footer} spacing={2} justify="flex-end">
        <Grid item xs={1}>
          {step > 0 &&
            <Button
              fullWidth
              variant="contained"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          }
        </Grid>
        <Grid item xs={1}>
          {step < stepLabels.length - 1 &&
            <Button
              fullWidth
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              onClick={handleClickNext}
            >
              Next
            </Button>
          }
          {step == stepLabels.length - 1 &&
            <Button 
              fullWidth
              variant="contained"
              color="primary"
              endIcon={<Icon>save</Icon>}
              onClick={handleSubmitForm}
            >
              Create
            </Button>
          }
        </Grid>
      </Grid>
    </Grid>
  );
}