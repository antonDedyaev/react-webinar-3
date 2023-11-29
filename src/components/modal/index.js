import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal(props) {
  const cn = bem("Modal");

  return (
    <div className={props.isActive ? cn({ is: "active" }) : cn()}>
      <div
        className={
          props.isActive ? cn("Content", { is: "active" }) : cn("Content")
        }
      >
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isActive: false,
};

export default React.memo(Modal);
