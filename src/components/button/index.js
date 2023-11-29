import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Button(props) {
  return (
    <button className="Button" onClick={() => props.handleClick()}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  handleClick: () => {},
};

export default React.memo(Button);
