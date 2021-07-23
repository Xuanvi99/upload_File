import * as types from "../constants";

const DEFAULT_STATE = {
  listImg: [],
  dataFetched: false,
  isFetching: false,
  error: false,
  errorMessage: null,
  activePage: "",
  textSearch: "",
  totalPage: "",
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_SUCCESS:
      return {
        ...state,
        dataFetched: true,
        isFetching: false,
        listImg: action.payload.res.listImg,
        totalPage: action.payload.res.totalPage,
        activePage: action.payload.activePage,
        textSearch: action.payload.textSearch,
      };
    case types.GET_FAIlURE:
      return {
        ...state,
        isFetching: false,
      };

    case types.POST_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.POST_SUCCESS:
      return {
        ...state,
        dataFetched: true,
        isFetching: false,
      };
    case types.POST_FAIlURE:
      return {
        ...state,
        isFetching: false,
      };

    case types.DELETE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.DELETE_SUCCESS:
      return {
        ...state,
        dataFetched: true,
        isFetching: false,
      };
    case types.DELETE_FAIlURE:
      return {
        ...state,
        isFetching: false,
      };

    case types.PUT_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.PUT_SUCCESS:
      return {
        ...state,
        dataFetched: true,
        isFetching: false,
      };
    case types.PUT_FAIlURE:
      return {
        ...state,
        isFetching: false,
      };
    case types.GET_ONE_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_ONE_SUCCESS:
      return {
        ...state,
        dataFetched: true,
        isFetching: false,
        listImg: action.payload.res.listImg,
        totalPage: action.payload.res.totalPage,
        activePage: action.payload.activePage,
        textSearch: action.payload.textSearch,
      };
    case types.GET_ONE_FAIlURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};
