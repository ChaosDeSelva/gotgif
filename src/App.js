import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import GifBoard from './components/GifBoard/GifBoard';
import About from './components/About/About';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" exact component={GifBoard} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
