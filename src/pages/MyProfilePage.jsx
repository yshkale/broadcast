import Like from "../icons/ui/twitter-like-outline.svg";
import LikeFill from "../icons/twitter-like-filled.svg";
import Comment from "../icons/ui/twitter-reply-outline.svg";
import Bookmark from "../icons/bookmark.svg";
import BookmarkFill from "../icons/bookmark-filled.svg";
import ArrowLeft from "../icons/arrow-left.svg";
import DeleteIcon from "../icons/delete.svg";
import BannerImg from "../images/banner-images/banner1.webp";
import Location from "../icons/twitter-location.svg";
import LinkIcon from "../icons/twitter-link.svg";
import Calender from "../icons/twitter-lists.svg";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTweets } from "../contexts/TweetsContext";
import { toast } from "react-hot-toast";

function ProfilePage() {
  const { user } = useAuth();
  const { tweets, likeTweet, markBookmark, deleteTweet } = useTweets();
  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentProfileTweets =
    user && tweets.filter((t) => t.userId === user.id);

  const userPicture =
    user && user.profilePic
      ? `/profile-pictures/${user.profilePic}`
      : localStorage.getItem("profilePic");

  function handleDeleteTweet(tweetId) {
    deleteTweet(tweetId);
    toast.success("Cast deleted");
  }

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
            <h3 className="font-semibold tracking-wide">{user && user.name}</h3>
            <p className="font-extralight text-stone-300 text-xs tracking-wider">
              {user && currentProfileTweets.length} Casts
            </p>
          </div>
        </div>

        <div className="relative">
          <img
            className="w-full max-h-32 bg-contain"
            src={BannerImg}
            alt="banner of the current user"
          />

          <div className="flex justify-between mt-[-32px] px-4">
            <img
              className="w-20 h-20 rounded-full object-cover border-2 border-stone-950"
              src={userPicture}
              alt="pofile picture of the current user"
            />

            <Link className="self-end" to={"/edit-profile"}>
              <button className="font-semibold text-sm tracking-wide text-stone-50 border border-stone-700 px-4 rounded-full h-9 ml-2 ">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col px-4 gap-3 mt-5 mb-4">
          <div className="mb-1">
            <h2 className="font-bold tracking-wider text-xl">
              {user && user.name}
            </h2>
            <p className="text-stone-500 text-sm tracking-wider">
              @{user && user.username}
            </p>
          </div>

          <div>
            <p className="font-light text-sm text-stone-100 w-10/12 ">
              {user && user.bio}
            </p>
          </div>

          <div className="flex flex-col  gap-1">
            <div className="flex gap-2 items-center">
              <img className="w-3" src={Location} alt="location icon" />
              <p className="font-normal text-sm text-stone-500">
                {user && user.location}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <img className="w-3" src={LinkIcon} alt="link icon" />
              <a
                href={user && user.website}
                className="font-light text-sm text-purple-500"
                target="_blank"
                rel="noreferrer"
              >
                {user && user.website}
              </a>
            </div>

            <div className="flex gap-2 items-center">
              <img className="w-3" src={Calender} alt="calender icon" />
              <p className=" text-sm text-stone-500">
                Joined {user && months[user.joiningDate.month - 1]} {""}
                {user && user.joiningDate.year}
              </p>
            </div>
          </div>
        </div>

        <Link to={`/followersfollowings/${user && user.id}`}>
          <div className="flex gap-4 px-4 items-center">
            <p className="text-sm text-stone-500">
              <span className="font-semibold text-stone-100">
                {user && user.following.length}
              </span>{" "}
              Following
            </p>
            <p className="text-sm text-stone-500">
              <span className="font-semibold text-stone-100">
                {user && user.followers.length}
              </span>{" "}
              Followers
            </p>
          </div>
        </Link>

        <div className="mt-6 mb-1 px-4 border-b border-stone-700">
          <h3 className="font-semibold py-3 tracking-wider border-b-2 border-purple-700 inline-block">
            Casts by you
          </h3>
        </div>

        {user &&
          currentProfileTweets.map((t) => {
            return (
              <div
                key={t.id}
                className="flex px-4 pt-4 pb-2 border-b border-stone-800 relative"
              >
                <img
                  src={userPicture}
                  className="w-10 h-10 mr-4 flex-shrink-0 rounded-full object-cover "
                  alt="profile picture of the user"
                />

                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-sm font-semibold">{user.name}</h3>
                    <p className="text-xs text-stone-500">@{user.username}</p>
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

                    <div className="flex items-center gap-2">
                      <img src={Comment} className="w-4 h-4" alt="comment" />
                      <span className="text-xs text-stone-500">
                        {t.comments.length}
                      </span>
                    </div>

                    <img
                      className="w-[1.1rem] invert mr-auto"
                      src={DeleteIcon}
                      alt="more icon"
                      onClick={() => handleDeleteTweet(t.id)}
                    />

                    <img
                      src={t.bookmark ? BookmarkFill : Bookmark}
                      className="w-[0.9rem] h-[0.9rem] mr-2"
                      alt="bookmark"
                      onClick={() => markBookmark(t.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

        {user && currentProfileTweets.length === 0 && (
          <div className="text-stone-500 flex justify-center items-center px-14 py-8 text-center text-sm">
            <p>Your casts will appear here once you post them.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
