import * as actionTypes from './actions';

const initialState = {
  gifData: {
    pagination: {},
    meta: {},
    results: []
  },
  api: {
    url: '/trending',
    params: {
      rating: 'pg',
      offset: 0,
      q: ''
    }
  }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SAVE_SEARCH_GIF_RESULTS:
          return {
            ...state,
            gifData: Object.assign(state.gifData, action.data)
          };

        case actionTypes.APPEND_SEARCH_GIF_RESULTS:
          const responseArray = action.data.moreResults;
          const newArray = [...state.gifData.results];

          for (var i = 0; i < responseArray.length; i++) {
            newArray.push(responseArray[i]);
          }

          return {
            ...state,
            gifData: Object.assign(state.gifData, { pagination: action.data.pagination,
              meta: action.data.meta, results: newArray })
          };

        case actionTypes.UPDATE_API:
          return {
            ...state,
            api: Object.assign(state.api, action.data)
          };

        case actionTypes.INCREMENT_API_OFFSET:
          return {
            ...state,
            api: {
              ...state.api,
              params: {
                ...state.api.params,
                offset: state.gifData.pagination.offset + state.gifData.pagination.count
              }
            }
          };
        default:
            return state;
    }
};

export default reducer;
