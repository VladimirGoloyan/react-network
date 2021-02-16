import React, { Component } from 'react';

import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Container from './containers/Container/Container';

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Layout>
          <Container />
        </Layout>
      </div>
    )
  }
}

export default App;
