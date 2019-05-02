import React, { Component } from 'react';

import './Search.css';

export default class Search extends Component {
  state = {
    value: '',
  }

  constructor(props) {
    super(props);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.submitSearchResults();
  };

  handleSearchChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.submitSearchResults();
    }
  }

  submitSearchResults() {
    this.props.onSearchResults({url: '/search',   params: { rating: 'pg', q: this.state.value, offset: 0 }});
  }

  render() {
    return (
      <form align="center" id="searchForm">
        <br/>
        <input
           onKeyDown={this.handleKeyDown}
           autoFocus={true}
           placeholder="Search..."
           onChange={this.handleSearchChange}
         />
       <br/><br/>
       <button onClick={this.handleSearchSubmit}>SUBMT SEARCH</button>
      </form>
    )
  }
}
