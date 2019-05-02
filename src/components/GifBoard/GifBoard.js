import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import LightboxGif from '../../components/LightboxGif/LightboxGif';
import Search from '../../components/Search/Search';
import gifGrab from '../../config/axios/GifGrab';
import Masonry from 'react-masonry-component';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import Modal from '../UI/Modal/Modal';
import uuid from "uuid";

import './GifBoard.css';

class GifBoard extends Component {
    // Use local state to handle the landing status
    state = {
      loading: true,
      error: null,
      endOfList: false
    }

    componentDidMount() {
      this.handleNewSearchResults();
    }

    callGifApi() {
      return gifGrab.get(this.props.api.url, { params: this.props.api.params })
      .then(res => {
        return res;
      })
      .catch(err => {
        this.setState( { error: { message: 'Error finding gifs!'} } );
      });
    }

    handleNewSearchResults() {
      this.callGifApi().then(res => {
          this.props.onSaveSearchGifResults( { results: res.data.data,
            meta: res.data.meta, pagination: res.data.pagination } );
          this.updateLoadingStatusWithDelay(false);
          this.setState({endOfList: false});
      })
      .catch(err => {
        this.setState( { error: { message: 'Error finding gifs!'} } );
      });
    }

    loadMoreItems =()=> {
        this.props.onIncrementApiOffset();

        this.callGifApi().then(res => {
          this.props.onAppendSearchGifResults( { moreResults: res.data.data,
            meta: res.data.meta, pagination: res.data.pagination } );
          this.updateLoadingStatusWithDelay(false);

          //check for end of list
          const totalLoaded = this.props.gifData.results.length || 0;
          const totalCount = this.props.gifData.pagination.total_count || 0;
          const countEachLoad = this.props.gifData.pagination.count || 0;

          //computed property for end of list check
          if (totalLoaded + countEachLoad > totalCount) {
            this.setState({endOfList: true});
          }
        })
        .catch(err => {
          this.setState( { error: { message: 'Error finding gifs!'} } );
        });
    };

    updateLoadingStatusWithDelay(status) {
      // Wait for initial images, before turning off the
      // loading so we can push the waypoint down
      setTimeout(()=>{
        this.setState({loading: status});
      },250);
    }

    renderItems = () => {
      if (this.state.loading || typeof this.props.gifData.results === 'undefined' || this.props.gifData.results.length <= 0) {
        return;
      }

      // Was using ${imageObject.id}-${Date.now()} for the key but that was on a rare
      // case throwing dup key errors.  Switching to UUID.
      return this.props.gifData.results.map((imageObject) => {
        if(typeof imageObject.images !== 'undefined') {
          return (
            <LightboxGif imageObject={imageObject} key={uuid.v4()} />
          );
        }
        else {
          return (<div>Error Loading Image.</div>);
        }
      });
    };

    renderWaypoint = () => {
      if (!this.state.loading) {
        return (
          <Waypoint onEnter={this.loadMoreItems} />
        );
      }
    };

    handleSearchResults = (data) => {
      this.setState({loading: true});
      this.props.onUpdateApiResults( data );
      this.handleNewSearchResults();
    }

    errorConfirmedHandler = () => {
        this.setState( { error: null } );
    }

    render () {
        const masonryOptions = { transitionDuration: 0 };

        return (
            <div>
              <Modal
                  show={this.state.error}
                  modalClosed={this.errorConfirmedHandler}>
                  {this.state.error ? this.state.error.message : null}
              </Modal>
              <Search onSearchResults={this.handleSearchResults} />
              <br/>
              <div className="infinite-scroll">
                <div className="infinite-scroll__scrollable-parent">
                  <div className="container">
                    <div className="masonry-container">
                      <Masonry options={masonryOptions}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={true}>
                        {this.renderItems()}
                      </Masonry>
                    </div>
                  </div>
                  <div className="infinite-scroll__waypoint">
                    <div align="center" className={this.state.endOfList ? 'hidden' : ''}>
                      {this.renderWaypoint()}
                      <h1 >LOADING MORE ITEMS</h1>
                      <p className="infinite-scroll__arrow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gifData: state.gifData,
        api: state.api,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveSearchGifResults: (data) => dispatch({type: actionTypes.SAVE_SEARCH_GIF_RESULTS, data}),
        onAppendSearchGifResults: (data) => dispatch({type: actionTypes.APPEND_SEARCH_GIF_RESULTS, data}),
        onUpdateApiResults: (data) => dispatch({type: actionTypes.UPDATE_API, data}),
        onIncrementApiOffset: () => dispatch({type: actionTypes.INCREMENT_API_OFFSET})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(GifBoard, gifGrab));
