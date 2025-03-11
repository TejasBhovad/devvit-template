import React from "react";
import { useState, useEffect } from "react";
import { sendToDevvit } from "../utils";
import { useDevvitListener } from "../hooks/useDevvitListener";

const TestPage = () => {
  const [commentState, setCommentState] = useState({ comments: [] });
  const [loading, setLoading] = useState(false);
  const comments = useDevvitListener("TOP_COMMENTS_RESPONSE");

  const fetchComments = () => {
    setLoading(true);
    sendToDevvit({
      type: "GET_TOP_COMMENTS",
      payload: {},
    });
  };

  useEffect(() => {
    if (comments) {
      setCommentState(comments);
      setLoading(false);
    }
  }, [comments]);

  return (
    <div className="mx-auto min-h-screen max-w-4xl bg-white p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Reddit Comments</h1>

      <div className="mb-6">
        <button
          onClick={fetchComments}
          disabled={loading}
          className="rounded bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600 disabled:bg-orange-300"
        >
          {loading ? "Loading comments..." : "Fetch Comments"}
        </button>
      </div>

      {loading ? (
        <div className="my-8 flex justify-center">
          <div className="animate-pulse text-gray-600">Loading comments...</div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h2 className="font-medium text-gray-800">
              Comments ({commentState.comments?.length || 0})
            </h2>
          </div>

          {commentState.comments && commentState.comments.length > 0 ? (
            <div>
              {commentState.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50"
                >
                  <div className="p-4">
                    <div className="mb-1 flex items-center gap-2 text-xs text-gray-600">
                      <span className="font-medium text-gray-800">
                        u/{comment.author}
                      </span>
                      <span>•</span>
                      <div className="flex items-center">
                        <svg
                          className="mr-1 h-3 w-3 fill-current text-orange-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span>
                          {comment.score} point{comment.score !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-800">{comment.body}</div>

                    <div className="mt-2 flex gap-3 text-xs text-gray-600">
                      <button className="flex items-center hover:text-gray-800">
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                          />
                        </svg>
                        Upvote
                      </button>
                      <button className="flex items-center hover:text-gray-800">
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        Downvote
                      </button>
                      <button className="flex items-center hover:text-gray-800">
                        <svg
                          className="mr-1 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-600">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <p>No comments yet</p>
              <p className="mt-2 text-sm">
                Click the button above to fetch comments
              </p>
            </div>
          )}
        </div>
      )}

      {commentState.comments && commentState.comments.length > 0 && (
        <div className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-800">
              Raw JSON Data:
            </h3>
            <span className="text-xs text-gray-600">
              {commentState.comments.length} comment(s)
            </span>
          </div>
          <pre className="max-h-48 overflow-auto rounded bg-gray-50 p-3 text-xs text-gray-800">
            {JSON.stringify(commentState, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestPage;
