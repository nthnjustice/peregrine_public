import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import View from './View';
import Create from './Create';
import Open from './Open';

const useStyles = makeStyles({
  wrapper: {
    margin: '1rem',
  },
  tab: {
    '&:hover': {
      color: '#000000'
    }
  }
});

export default function Workbook() {
  const styles = useStyles();
  const [tab, setTab] = useState(0);

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
          <Tab className={styles.tab} label="View Active Workbook"/>
          <Tab className={styles.tab} label="Open Existing Workbook"/>
          <Tab className={styles.tab} label="Create New Workbook"/>
        </Tabs>
        {tab === 0 &&
          <View/>
        }
        {tab === 1 &&
          <Open onChangeTab={tab => setTab(tab)}/>
        }
        {tab === 2 &&
          <Create onChangeTab={tab => setTab(tab)}/>
        }
      </CardContent>
    </Card>
  );
}