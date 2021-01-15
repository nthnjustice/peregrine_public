import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useGlobalValue } from '../Global';
import Flights from './Flights';
import Pings from './Pings';

const useStyles = makeStyles({
  wrapper: {
    margin: '1rem',
  }
});

export default function Table(props) {
  const styles = useStyles();
  const [{workbook}] = useGlobalValue();
  const [tab, setTab] = useState(0);
  
  useEffect(() => {
    if (!workbook) {
      props.history.push('/workbook');
    }
  });

  return(
    <Card raised className={styles.wrapper}>
      <CardContent>
        <Tabs
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          value={tab}
          onChange={(event, tab) => setTab(tab)}
        >
          <Tab label="Flight Table"/>
          <Tab label="Ping Table"/>
        </Tabs>
        {tab === 0 &&
          <Flights/>
        }
        {tab === 1 &&
          <Pings/>
        }
      </CardContent>
    </Card>
  );
}