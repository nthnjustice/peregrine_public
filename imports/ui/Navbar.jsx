import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { useGlobalValue } from './Global';

const useStyles = makeStyles({
  brand: {
    flex: 1
  },
  nav: {
    color: '#bdbdbd'
  },
  active: {
    color: '#ffffff'
  }
});

export default function Navbar(props) {
  const styles = useStyles();
  const [{workbook}] = useGlobalValue();
  const [active, setActive] = useState(props.browserHistory.location.pathname);

  const handleClickNav = nav => {
    if (nav === '/') {
      Meteor.logout();
    } else {
      props.browserHistory.push(nav);
      setActive(nav);
    }
  }

  return(
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h5" className={styles.brand}>Peregrine</Typography>
        <Tooltip title="Workbook">
          <IconButton
            className={active === '/workbook' ? styles.active : styles.nav}
            onClick={() => handleClickNav('/workbook')}
          >
            <Icon>import_contacts</Icon>
          </IconButton>
        </Tooltip>
        {workbook &&
          <Tooltip title="Map">
            <IconButton
              className={active === '/map' ? styles.active : styles.nav}
              onClick={() => handleClickNav('/map')}
            >
              <Icon>map</Icon>
            </IconButton>
          </Tooltip>
        }
        {workbook &&
          <Tooltip title="Table">
            <IconButton
              className={active === '/table' ? styles.active : styles.nav}
              onClick={() => handleClickNav('/table')}
            >
              <Icon>table_chart</Icon>
            </IconButton>
          </Tooltip>
        }
        <Tooltip title="Sign Out">
          <IconButton
            className={styles.nav}
            onClick={() => handleClickNav('/')}
          >
            <Icon>account_circle</Icon>
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}