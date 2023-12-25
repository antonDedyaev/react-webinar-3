import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CommentForm({
  title,
  text,
  id,
  onChange,
  onSubmit,
  onCancel,
  withCancel,
  t,
}) {
  const cn = bem("CommentForm");

  return (
    <form className={cn()} onSubmit={onSubmit(id)}>
      <h2>{title}</h2>
      <textarea
        className={cn("text")}
        value={text}
        name="text"
        onChange={onChange}
      ></textarea>
      <div className={cn("buttons")}>
        <button type="submit" disabled={!text.trim().length}>
          {t("comment.submitBtn")}
        </button>
        {withCancel && (
          <button type="button" onClick={onCancel}>
            {t("comments.cancel")}
          </button>
        )}
      </div>
    </form>
  );
}

CommentForm.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  withCancel: PropTypes.bool,
  t: PropTypes.func,
};

CommentForm.defaultProps = {
  t: (text) => text,
};

export default memo(CommentForm);
