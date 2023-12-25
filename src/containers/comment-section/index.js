import { memo, useCallback, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import { useParams } from "react-router-dom";
import CommentsHeader from "../../components/comments-header";
import AuthReminder from "../../components/auth-reminder";
import { useDispatch, useSelector } from "react-redux";
import shallowEqual from "shallowequal";
import CommentsLayout from "../../components/comments-layout";
import commentsActions from "../../store-redux/comments/actions";
import CommentCard from "../../components/comment-card";
import CommentForm from "../../components/comment-form";
import buildCommentHierarchy from "../../utils/bulidHierarchy";
import FormWrapper from "../../components/form-wrapper";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

function CommentSection() {
  const { t } = useTranslate();
  const dispatch = useDispatch();
  const params = useParams();

  const [text, setText] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState(null);

  const select = useSelector(
    (state) => ({
      user: state.session.user,
      exists: state.session.exists,
      comments: state.comments.comments,
      count: state.comments.count,
    }),
    shallowEqual
  );

  const callbacks = {
    onChange: useCallback(
      (e) => {
        setText(e.target.value);
      },
      [text]
    ),
    onSubmit: useCallback(
      (id = params.id) =>
        (e) => {
          e.preventDefault();
          const type = id === params.id ? "article" : "comment";
          dispatch(
            commentsActions.submitComment(
              text,
              id,
              select.user.profile.name,
              type
            )
          );
          setText("");
          setReplyToCommentId(null);
        },
      [text]
    ),
    onReply: useCallback(
      (id) => {
        setReplyToCommentId(id);
      },
      [replyToCommentId]
    ),
    onCancel: useCallback(() => {
      setReplyToCommentId(null);
      setText("");
    }, [replyToCommentId]),
  };

  function renderComments(comments) {
    return comments.map((comment) => (
      <FormWrapper
        key={comment._id}
        style={{ marginLeft: comment.depth < 5 && "30px" }}
      >
        <CommentCard
          key={comment._id}
          comment={comment}
          onReply={setReplyToCommentId}
          t={t}
        >
          {comment.children.length > 0 && (
            <div style={{ marginLeft: comment.depth < 5 && "30px" }}>
              {renderComments(comment.children)}
            </div>
          )}
          {replyToCommentId === comment._id && (
            <FormWrapper>
              {select.exists ? (
                <CommentForm
                  title={t("comment.title.reply")}
                  text={text}
                  id={comment._id}
                  onChange={callbacks.onChange}
                  onSubmit={callbacks.onSubmit}
                  onCancel={callbacks.onCancel}
                  withCancel={true}
                  t={t}
                />
              ) : (
                <AuthReminder withCancel={true} t={t} />
              )}
            </FormWrapper>
          )}
        </CommentCard>
      </FormWrapper>
    ));
  }

  const commentsTree = buildCommentHierarchy(select.comments);
  const comm = treeToList(listToTree(select.comments));
  console.log("commentTreeCurr", commentsTree);
  console.log("commentTreeNew", comm);

  const renderedComments = renderComments(commentsTree);

  return (
    <CommentsLayout>
      <CommentsHeader count={select.count} t={t} />
      {renderedComments}
      {!replyToCommentId && (
        <FormWrapper>
          {select.exists ? (
            <CommentForm
              title={t("comment.title.newText")}
              text={text}
              onChange={callbacks.onChange}
              onSubmit={callbacks.onSubmit}
              t={t}
            />
          ) : (
            <AuthReminder withCancel={false} t={t} />
          )}
        </FormWrapper>
      )}
    </CommentsLayout>
  );
}

export default memo(CommentSection);
