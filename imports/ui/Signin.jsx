import React, { useReducer } from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

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
    marginTop: '10vh'
  },
  title: {
    backgroundColor: '#3f51b5',
    color: '#ffffff' 
  },
  row: {
    marginTop: '2rem'
  }
});

export default function Signin() {
  const styles = useStyles();
  const [username, setUsername] = useReducer(inputReducer, inputState);
  const [password, setPassword] = useReducer(inputReducer, inputState);

  const dispatchers = {
    username: setUsername,
    password: setPassword
  };  

  const handleChangeInput = (input, value) => {
    dispatchers[input]({type: 'updateValue', value});
    dispatchers[input]({type: 'updateError', error: false});
    dispatchers[input]({type: 'updateHelperText', helperText: ''});
  };

  const isFormValid = () => {
    let isValid = true;
    let required = {username, password};

    Object.keys(required).map(input => {
      if (required[input].value === '') {
        isValid = false;
        dispatchers[input]({type: 'updateError', error: true});
        dispatchers[input]({type: 'updateHelperText', helperText: `can't be blank`});
      }
    });

    return isValid;
  };

  const handleSubmitForm = () => {
    if (isFormValid()) {
      Meteor.loginWithPassword(username.value, password.value, error => {
        if (error) {
          if (error.reason == 'User not found') {
            setUsername({type: 'updateError', error: true});
            setUsername({type: 'updateHelperText', helperText: 'username not found'});
          } else if (error.reason == 'Incorrect password') {
            setPassword({type: 'updateError', error: true});
            setPassword({type: 'updateHelperText', helperText: 'incorrect password'});
          }
        }
      });
    }
  };

  return(
    <Container className={styles.wrapper} maxWidth="sm">
      <Card raised>
        <CardHeader
          className={styles.title}
          title="Peregrine"
          titleTypographyProps={{
            variant: 'h3',
            align: 'center'
          }}/>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h5">Sign In</Typography>
              </Grid>
            </Grid>
            <Grid container className={styles.row} justify="center" alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  label="Username"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>account_circle</Icon>
                      </InputAdornment>
                    )
                  }}
                  value={username.value}
                  error={username.error}
                  helperText={username.helperText}
                  onChange={event => handleChangeInput('username', event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container className={styles.row} justify="center" alignItems="flex-end">
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  type="password"
                  variant="outlined"
                  autoComplete="off"
                  label="Password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon>lock</Icon>
                      </InputAdornment>
                    )
                  }}
                  value={password.value}
                  error={password.error}
                  helperText={password.helperText}
                  onChange={event => handleChangeInput('password', event.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container className={styles.row} justify="center">
              <Grid item xs={3}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  endIcon={<Icon>send</Icon>}
                  onClick={handleSubmitForm}
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </CardContent>
      </Card>
    </Container>
  );
}