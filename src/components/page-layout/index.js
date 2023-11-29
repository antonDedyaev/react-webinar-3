import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PageLayout({ children }) {
  const cn = bem("PageLayout");

  return (
    <div className={cn()}>
      <div className={cn("Center")}>{children}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
