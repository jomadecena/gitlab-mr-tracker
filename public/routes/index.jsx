import {createHashHistory} from 'history';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter, connectRouter} from 'connected-react-router';
import {applyMiddleware, createStore} from 'redux';
import ReduxPromise from 'redux-promise-middleware';

import Header from '../components/common/header/Header';
import Home from '../components/pages/home/Home';
import FallbackRoute from '../components/pages/404/FallbackRoute';

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
            <Header/>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route component={FallbackRoute}/>
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
