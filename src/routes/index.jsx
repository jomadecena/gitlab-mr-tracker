import {createHashHistory} from 'history';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter, connectRouter} from 'connected-react-router';
import {applyMiddleware, createStore} from 'redux';
import ReduxPromise from 'redux-promise-middleware';

import Home from '../components/pages/home/Home';

import reducers from '../reducers/index';
const history = createHashHistory();
const createStoreWithMiddleware = applyMiddleware(ReduxPromise())(createStore);
const store = createStoreWithMiddleware(connectRouter(history)(reducers));

export default class Router extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Switch>
              <Route exact path='/' component={Home}/>
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
