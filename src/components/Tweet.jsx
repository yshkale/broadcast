import Like from "../icons/ui/twitter-like-outline.svg";
import LikeFill from "../icons/twitter-like-filled.svg";
import Comment from "../icons/ui/twitter-reply-outline.svg";
import Bookmark from "../icons/bookmark.svg";
import BookmarkFill from "../icons/bookmark-filled.svg";
import DeleteIcon from "../icons/delete.svg";
import Users from "../dB/users";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useAuth } from "../contexts/AuthContext";
import { useTweets } from "../contexts/TweetsContext";
import { toast } from "react-hot-toast";

function Tweet() {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { tweets, markBookmark, likeTweet, deleteTweet } = useTweets();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-1/2">
        <Oval
          height={30}
          width={30}
          color="#9333ea"
          wrapperStyle={{}}
          wrapperClass=""
          ariaLabel="oval-loading"
          secondaryColor="#c084fc"
          strokeWidth={4}
          strokeWidthSecondary={4}
        />
      </div>
    );
  }

  function handleDeleteTweet(tweetId) {
    deleteTweet(tweetId);
    toast.success("Cast deleted");
  }

  return (
    <div>
      {!isLoading &&
        tweets.map((t) => {
          const tweetUser = Users.find((u) => t.userId === u.id);
          const profilePic =
            "src/images/profile-pictures/" + tweetUser.profilePic;

          return (
            <div
              key={t.id}
              className="flex px-4 pt-4 pb-2 border-b border-stone-800 relative"
            >
              <Link
                className="mr-4 flex-shrink-0"
                to={
                  user && tweetUser.id === user.id
                    ? "/myprofile"
                    : `/profile/${t.userId}`
                }
              >
                <img
                  src={profilePic}
                  className="w-10 h-10 rounded-full object-cover "
                  alt="profile picture of the user"
                />
              </Link>

              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <h3 className="text-sm font-semibold">{tweetUser.name}</h3>
                  <p className="text-xs text-stone-500">
                    @{tweetUser.username}
                  </p>
                  <p className="text-xs text-stone-500 mr-auto">
                    &middot; {t.date.split(",")[0]}
                  </p>
                </div>

                <Link to={`/tweet/${t.id}`}>
                  <p className="text-sm text-stone-50">{t.content}</p>
                </Link>

                <div className="flex gap-8 items-center mb-2 mt-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={t.isLiked ? LikeFill : Like}
                      className="w-4 h-4"
                      alt="like"
                      onClick={() => likeTweet(t.id)}
                    />
                    <span className="text-xs text-stone-500">{t.likes}</span>
                  </div>

                  <div className="flex items-center gap-2 ">
                    <img src={Comment} className="w-4 h-4" alt="comment" />
                    <span className="text-xs text-stone-500">
                      {t.comments.length}
                    </span>
                  </div>

                  {user && user.id === tweetUser.id && (
                    <img
                      className="w-[1.1rem] invert mr-auto"
                      src={DeleteIcon}
                      alt="more icon"
                      onClick={() => handleDeleteTweet(t.id)}
                    />
                  )}

                  <img
                    src={t.bookmark ? BookmarkFill : Bookmark}
                    className="w-[0.9rem] h-[0.9rem] ml-auto mr-2"
                    alt="bookmark"
                    onClick={() => markBookmark(t.id)}
                  />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Tweet;
