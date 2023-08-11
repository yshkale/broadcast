import { useNavigate, useParams, Link } from "react-router-dom";
import ArrowLeft from "../icons/arrow-left.svg";
import Like from "../icons/ui/twitter-like-outline.svg";
import LikeFill from "../icons/twitter-like-filled.svg";
import Comment from "../icons/ui/twitter-reply-outline.svg";
import Bookmark from "../icons/bookmark.svg";
import BookmarkFill from "../icons/bookmark-filled.svg";
import DeleteIcon from "../icons/delete.svg";
import { useState, useRef } from "react";
import Users from "../dB/users";
import { useAuth } from "../contexts/AuthContext";
import { useTweets } from "../contexts/TweetsContext";
import { toast } from "react-hot-toast";

function TweetPage() {
  const { user } = useAuth();
  const {
    tweets,
    likeTweet,
    markBookmark,
    addComment,
    addCommentLike,
    deleteComment,
  } = useTweets();

  const { tweetId } = useParams();
  const navigate = useNavigate();

  const commentFocus = useRef(null);
  const [newComment, setNewComment] = useState({
    id: Math.floor(Math.random() * 1000),
    userId: user && user.id,
    content: "",
    likes: 0,
    isLiked: false,
  });

  const ProfilePic = `/profile-pictures/${user && user.profilePic}`;

  const currentTweet = tweets.find((t) => t.id === parseInt(tweetId));

  const tweetAuthor = Users.find((u) => u.id === parseInt(currentTweet.userId));

  const tweetAuthorProfilePic = `/profile-pictures/${tweetAuthor.profilePic}`;

  function handleComment(e) {
    const value = e.target.value;

    setNewComment((prev) => ({
      ...prev,
      content: value,
    }));
  }

  function SubmitComment() {
    if (newComment.content.trim() === "") return;

    addComment(currentTweet.id, newComment);

    setNewComment({
      id: Math.floor(Math.random() * 1000),
      userId: user && user.id,
      content: "",
      likes: 0,
      isLiked: false,
    });
  }

  function handleDeleteComment(tweetId, commentId) {
    deleteComment(tweetId, commentId);
    toast.success("Comment deleted");
  }

  return (
    <div className="lg:max-w-4xl lg:mx-[24rem]">
      <div className="flex gap-8 px-6 py-4 items-center border-b border-stone-700 lg:py-6">
        <img
          className="w-4 h-4 invert cursor-pointer"
          src={ArrowLeft}
          alt="Back arrow"
          onClick={() => navigate(-1)}
        />

        <h3 className="font-semibold tracking-wide">Cast</h3>
      </div>

      <Link
        to={
          user && tweetAuthor.id === user.id
            ? "/myprofile"
            : `/profile/${tweetAuthor.id}`
        }
      >
        <div className="flex gap-4 px-4 pt-6 pb-4 items-center">
          <img
            className="w-12 h-12 object-cover rounded-full lg:w-16 lg:h-16"
            src={tweetAuthorProfilePic}
            alt="profile of the current tweet author"
          />
          <div>
            <h3 className="font-semibold ">{tweetAuthor.name}</h3>
            <p className="text-stone-500 text-sm">@{tweetAuthor.username}</p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-4 pl-4 pr-8 pb-4 border-b border-stone-700">
        <p className="text-stone-50 lg:text-lg">{currentTweet.content}</p>

        <p className="text-stone-500 font-light text-sm">
          {currentTweet.timestamp} &middot; {currentTweet.date}
        </p>
      </div>

      <div className="flex gap-4 mx-4 py-4 border-b border-stone-700">
        <p className="text-stone-500 font-light text-sm">
          <span className="text-stone-50 font-bold">
            {currentTweet.comments.length}
          </span>{" "}
          Comments
        </p>
        <p className="text-stone-500 font-light text-sm">
          <span className="text-stone-50 font-bold">{currentTweet.likes}</span>{" "}
          Likes
        </p>
        <p className="text-stone-500 font-light text-sm">
          <span className="text-stone-50 font-bold">
            {currentTweet.bookmark ? 1 : 0}
          </span>{" "}
          Bookmarks
        </p>
      </div>

      <div className="mx-4 py-4 flex justify-around border-b border-stone-700">
        <img
          className="w-5 h-5 cursor-pointer"
          src={Comment}
          alt="comment icon"
          onClick={() => commentFocus.current.focus()}
        />
        <img
          className="w-5 h-5 cursor-pointer"
          src={currentTweet.isLiked ? LikeFill : Like}
          alt="like icon"
          onClick={() => likeTweet(currentTweet.id)}
        />
        <img
          className="w-5 h-5 cursor-pointer"
          src={currentTweet.bookmark ? BookmarkFill : Bookmark}
          alt="bookmark icon"
          onClick={() => markBookmark(currentTweet.id)}
        />
      </div>

      <div className="px-4 py-6 flex gap-4 items-center border-b border-stone-700">
        <img
          className="w-11 rounded-full flex-shrink-0"
          src={ProfilePic}
          alt="current user image"
        />
        <textarea
          ref={commentFocus}
          rows={2}
          maxLength={40}
          name="newComment"
          value={newComment.content}
          onChange={handleComment}
          placeholder="Cast your reply!"
          className="w-full bg-black border-none outline-none text-md resize-none  placeholder:text-stone-500 placeholder:text-lg"
        />
        <button
          className="bg-purple-700 rounded-full px-4 h-9 font-semibold"
          onClick={() => SubmitComment()}
        >
          Reply
        </button>
      </div>

      {currentTweet.comments.map((c) => {
        const tweetUser = Users.find((u) => u.id === c.userId);
        const userPic = `/profile-pictures/${tweetUser.profilePic}`;

        return (
          <div
            key={c.id}
            className="flex  px-4 pt-4 pb-2 border-b border-stone-800"
          >
            <Link
              className="mr-4 flex-shrink-0"
              to={
                user && tweetUser.id === user.id
                  ? "/myprofile"
                  : `/profile/${tweetUser.id}`
              }
            >
              <img
                src={userPic}
                className="w-10 h-10 rounded-full object-cover "
                alt="profile picture of the user"
              />
            </Link>

            <div className="flex flex-col gap-1">
              <div className="flex gap-3 items-center">
                <h3 className="text-sm font-semibold">{tweetUser.name}</h3>
                <p className="text-sm text-stone-500">@{tweetUser.username}</p>
                <p className="text-sm text-stone-500">&middot; 2h</p>
              </div>

              <p className="text-sm text-stone-50">{c.content}</p>

              <div className="flex gap-6 items-center my-2">
                <div className="flex items-center gap-2">
                  <img
                    src={c.isLiked ? LikeFill : Like}
                    className="w-4 h-4 cursor-pointer"
                    alt="like"
                    onClick={() => addCommentLike(c.id)}
                  />
                  <span className="text-xs text-stone-500">{c.likes}</span>
                </div>

                {user && user.id === tweetUser.id && (
                  <img
                    className="w-4 invert cursor-pointer"
                    src={DeleteIcon}
                    alt="delete icon"
                    onClick={() => handleDeleteComment(currentTweet.id, c.id)}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TweetPage;
