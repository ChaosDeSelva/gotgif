import React, { Component } from 'react';

import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import './Layout.css';

class Layout extends Component {
    render () {
        return (
          <div className="center">
            <Aux>
                <Toolbar/>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
          </div>
        )
    }
}

export default Layout;
