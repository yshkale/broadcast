import Users from "../dB/users";
import Like from "../icons/ui/twitter-like-outline.svg";
import LikeFill from "../icons/twitter-like-filled.svg";
import Comment from "../icons/ui/twitter-reply-outline.svg";
import Bookmark from "../icons/bookmark.svg";
import BookmarkFill from "../icons/bookmark-filled.svg";
import ArrowLeft from "../icons/arrow-left.svg";
import BannerImg from "../images/banner-images/banner1.webp";
import Location from "../icons/twitter-location.svg";
import LinkIcon from "../icons/twitter-link.svg";
import Calender from "../icons/twitter-lists.svg";
import { useNavigate, useParams, Link } from "react-router-dom";

import { useTweets } from "../contexts/TweetsContext";
import { useAuth } from "../contexts/AuthContext";

function ProfilePage() {
  const { user, follow, unfollow } = useAuth();
  const { tweets, likeTweet, markBookmark } = useTweets();

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

  const navigate = useNavigate();
  const { userId } = useParams();

  const currentProfile = Users.find((u) => u.id === parseInt(userId));
  const currentProfileTweets = tweets.filter(
    (t) => t.userId === parseInt(userId)
  );

  const userPicture = "/profile-pictures/" + currentProfile.profilePic;

  return (
    <div className="lg:max-w-4xl lg:mx-[28rem]">
      <div className="flex gap-8 px-6 py-2 items-center border-b border-stone-700">
        <img
          className="w-5 h-5 invert cursor-pointer"
          src={ArrowLeft}
          alt="Back arrow"
          onClick={() => navigate("/app")}
        />
        <div className="flex flex-col">
          <h3 className="font-semibold tracking-wide">{currentProfile.name}</h3>
          <p className="font-extralight text-stone-300 text-xs tracking-wider">
            {currentProfileTweets.length} Casts
          </p>
        </div>
      </div>

      <div className="relative">
        <img
          className="w-full max-h-32 bg-contain lg:max-h-[15rem] lg:bg-cover"
          src={BannerImg}
          alt="banner of the current user"
        />

        <div className="flex justify-between mt-[-32px] px-4">
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-stone-950 lg:w-24 lg:h-24"
            src={userPicture}
            alt="pofile picture of the current user"
          />

          <button
            className={`font-semibold text-sm tracking-wide ${
              user.following.includes(currentProfile.id)
                ? "text-stone-50 bg-black border border-stone-700"
                : " text-stone-800 bg-stone-50"
            } px-4 rounded-full h-9 ml-2 self-end`}
            onClick={
              user.following.includes(currentProfile.id)
                ? () => unfollow(currentProfile.id)
                : () => follow(currentProfile.id)
            }
          >
            {user.following.includes(currentProfile.id)
              ? "Following"
              : "Follow"}
          </button>
        </div>
      </div>

      <div className="flex flex-col px-4 gap-3 mt-5 mb-4">
        <div className="mb-1">
          <h2 className="font-bold tracking-wider text-xl">
            {currentProfile.name}
          </h2>
          <p className="text-stone-500 text-sm tracking-wider">
            @{currentProfile.username}
          </p>
        </div>

        <div>
          <p className="font-light text-sm text-stone-100 w-10/12 ">
            {currentProfile.bio}
          </p>
        </div>

        <div className="flex flex-col  gap-1">
          <div className="flex gap-2 items-center">
            <img className="w-3" src={Location} alt="location icon" />
            <p className="font-normal text-sm text-stone-500">
              {currentProfile.location}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <img className="w-3" src={LinkIcon} alt="link icon" />
            <a
              href={currentProfile.website}
              className="font-light text-sm text-purple-500"
              target="_blank"
              rel="noreferrer"
            >
              {currentProfile.website}
            </a>
          </div>

          <div className="flex gap-2 items-center">
            <img className="w-3" src={Calender} alt="calender icon" />
            <p className=" text-sm text-stone-500">
              Joined {months[currentProfile.joiningDate.month - 1]} {""}
              {currentProfile.joiningDate.year}
            </p>
          </div>
        </div>
      </div>

      <Link to={`/followersfollowings/${currentProfile.id}`}>
        <div className="flex gap-4 px-4 items-center">
          <p className="text-sm text-stone-500">
            <span className="font-semibold text-stone-100">
              {currentProfile.following.length}
            </span>{" "}
            Following
          </p>

          <p className="text-sm text-stone-500">
            <span className="font-semibold text-stone-100">
              {currentProfile.followers.length}
            </span>{" "}
            Followers
          </p>
        </div>
      </Link>

      <div className="mt-6 mb-1 px-4 border-b border-stone-700">
        <h3 className="font-semibold py-3 tracking-wider border-b-2 border-purple-700 inline-block">
          Casts
        </h3>
      </div>

      {currentProfileTweets.map((t) => {
        return (
          <div
            key={t.id}
            className="flex px-4 pt-4 pb-2 border-b border-stone-800 lg:max-w-4xl"
          >
            <img
              src={userPicture}
              className="w-10 h-10 mr-4 flex-shrink-0 rounded-full object-cover "
              alt="profile picture of the user"
            />

            <div className="flex flex-col gap-1 flex-1">
              <div className="flex gap-2 items-center">
                <h3 className="text-sm font-semibold">{currentProfile.name}</h3>
                <p className="text-xs text-stone-500">
                  @{currentProfile.username}
                </p>
                <p className="text-xs text-stone-500">&middot; 2h</p>
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

                <div className="flex items-center gap-2 mr-auto">
                  <img src={Comment} className="w-4 h-4" alt="comment" />
                  <span className="text-xs text-stone-500">
                    {t.comments.length}
                  </span>
                </div>

                <img
                  src={t.bookmark ? BookmarkFill : Bookmark}
                  className="w-[0.9rem] h-[0.9rem] mr-2"
                  alt="bookmark"
                  onClick={() => {
                    markBookmark(t.id);
                    console.log("test");
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProfilePage;
