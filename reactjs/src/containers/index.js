import React, { useEffect } from "react";
import ItemConponemnt from "../components";
import * as actions from "../actions/index";
import { connect } from "react-redux";

const ItemContainer = (props) => {
  useEffect(() => {
    props.initLoad({ activePage: 1, textSearch: "" });
  }, []);
  return <ItemConponemnt {...props} />;
};
const mapStateToProps = (state) => {
  return {
    items: state.Items.listImg,
    activePage: state.Items.activePage,
    textSearch: state.Items.textSearch,
    totalPage: state.Items.totalPage,
  };
};
const mapDispatchTOProps = (dispatch) => {
  return {
    initLoad: (data) => {
      dispatch(actions.getImg(data));
    },
    postLoad: (data) => {
      dispatch(actions.postImg(data));
    },
    deleteLoad: (data) => {
      dispatch(actions.deleteImg(data));
    },
    updateLoad: (data) => {
      dispatch(actions.putImg(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchTOProps)(ItemContainer);
