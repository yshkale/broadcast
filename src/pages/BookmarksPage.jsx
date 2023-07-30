import { useNavigate, Link } from "react-router-dom";
import ArrowLeft from "../icons/arrow-left.svg";
import LikeIcon from "../icons/ui/twitter-like-outline.svg";
import LikeFill from "../icons/twitter-like-filled.svg";
import Comment from "../icons/ui/twitter-reply-outline.svg";
import { useTweets } from "../contexts/TweetsContext";
import Users from "../dB/users";
import { useAuth } from "../contexts/AuthContext";

function BookmarksPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tweets, likeTweet } = useTweets();

  const bookmarkedTweets = tweets.filter((t) => t.bookmark === true);

  return (
    <>
      <div>
        <div className="flex gap-8 px-6 py-2 items-center border-b border-stone-700">
          <img
            className="w-5 h-5 invert"
            src={ArrowLeft}
            alt="Back arrow"
            onClick={() => navigate("/app")}
          />
          <div className="flex flex-col">
            <h3 className="font-semibold tracking-wide">Bookmarks</h3>
            <p className="font-extralight text-stone-300 text-xs tracking-wider">
              {bookmarkedTweets.length} saved casts
            </p>
          </div>
        </div>

        {bookmarkedTweets.length === 0 && (
          <div className="flex justify-center items-center h-96">
            <p className="text-stone-500 text-sm px-8 text-center">
              You haven&apos;t added any casts to your bookmarks yet.
            </p>
          </div>
        )}

        {bookmarkedTweets.length >= 1 &&
          bookmarkedTweets.map((t) => {
            const tweetUser = Users.find((u) => t.userId === u.id);
            const profilePic = "/profile-pictures/" + tweetUser.profilePic;
            return (
              <div
                key={t.id}
                className="flex px-4 pt-4 pb-2 border-b border-stone-800"
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
                    <p className="text-xs text-stone-500">&middot; {t.date}</p>
                  </div>

                  <Link to={`/tweet/${t.id}`}>
                    <p className="text-sm text-stone-50">{t.content}</p>
                  </Link>

                  <div className="flex gap-8 items-center mb-2 mt-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={t.isLiked ? LikeFill : LikeIcon}
                        className="w-4 h-4"
                        alt="like"
                        onClick={() => likeTweet(t.id)}
                      />
                      <span className="text-xs text-stone-500">{t.likes}</span>
                    </div>

                    <div className="flex items-center gap-2 mr-auto">
                      <img src={Comment} className="w-4 h-4" alt="comment" />
                      <span className="text-xs text-stone-500">
                        {t.comments.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default BookmarksPage;
