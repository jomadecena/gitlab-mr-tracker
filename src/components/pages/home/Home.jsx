import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';

import './Home.css';
import Dashboard from './dashboard/Dashboard';
import Summary from './summary/Summary';

export default class Home extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={12}>
          <Dashboard/>
        </Grid.Column>
        <Grid.Column width={4}>
          <Summary/>
        </Grid.Column>
      </Grid>
    );
  }
}
