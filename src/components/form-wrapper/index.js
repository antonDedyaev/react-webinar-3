import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function FormWrapper({ children }) {
  const cn = bem("FormWrapper");

  return <div className={cn()}>{children}</div>;
}

FormWrapper.propTypes = {
  children: PropTypes.node,
};

export default memo(FormWrapper);
