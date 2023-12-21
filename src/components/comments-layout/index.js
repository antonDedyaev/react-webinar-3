import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentsLayout({ children }) {
  const cn = bem("CommentsLayout");

  return <section className={cn()}>{children}</section>;
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(CommentsLayout);
