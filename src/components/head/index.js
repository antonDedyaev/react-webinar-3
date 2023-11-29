import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head(props) {
  return (
    <div className="Head">
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
};

export default React.memo(Head);
