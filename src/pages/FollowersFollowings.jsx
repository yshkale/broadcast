import { useNavigate, useParams, Link } from "react-router-dom";
import ArrowLeft from "../icons/arrow-left.svg";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function FollowersFollowings() {
  const { user, allUsers } = useAuth();
  const { userId } = useParams();
  const currentUser = allUsers.find((u) => u.id === parseInt(userId));
  const navigate = useNavigate();

  const [loadFollowers, setLoadFollowers] = useState(true);

  return (
    <div>
      <div className="flex gap-8 px-6 py-2 items-center border-b border-stone-700">
        <img
          className="w-5 h-5 invert"
          src={ArrowLeft}
          alt="Back arrow"
          onClick={() => navigate(-1)}
        />
        <div className="flex flex-col">
          <h3 className="font-semibold tracking-wide">
            {currentUser && currentUser.name}
          </h3>
          <p className="font-extralight text-stone-300 text-xs tracking-wider">
            @{currentUser && currentUser.username}
          </p>
        </div>
      </div>

      <div className="flex justify-evenly items-center border-b border-stone-700">
        <p
          className={`px-2 py-4 ${
            loadFollowers && "border-b-2 border-purple-700"
          }`}
          onClick={() => setLoadFollowers(true)}
        >
          Followers
        </p>
        <p
          className={`px-2 py-4 ${
            !loadFollowers && "border-b-2 border-purple-700"
          }`}
          onClick={() => setLoadFollowers(false)}
        >
          Following
        </p>
      </div>

      {loadFollowers && currentUser.followers.length === 0 && (
        <div className="flex justify-center items-center h-96 text-stone-500 px-4 text-center">
          {" "}
          {currentUser.name} has no followers{" "}
        </div>
      )}

      {!loadFollowers && currentUser.following.length === 0 && (
        <div className="flex justify-center items-center h-96 text-stone-500 px-4 text-center">
          {" "}
          {currentUser.name} does not follow anyone{" "}
        </div>
      )}

      {loadFollowers &&
        currentUser.followers.map((followerId) => {
          const follower = allUsers.find((u) => u.id === followerId);
          const followerPic = `/src/images/profile-pictures/${follower.profilePic}`;

          return (
            <div key={follower.id} className="px-4 py-4">
              <Link
                to={
                  user && follower.id === user.id
                    ? "/myprofile"
                    : `/profile/${follower.id}`
                }
              >
                <div className="flex gap-4 items-start">
                  <img
                    className="w-12 h-12 object-cover flex-shrink-0 rounded-full"
                    src={followerPic}
                    alt={`Profile of ${follower.name}`}
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <h3 className="font-semibold ">{follower.name}</h3>
                      <p className="text-stone-500 text-sm">
                        @{follower.username}
                      </p>
                    </div>
                    <p className=" text-sm">{follower.bio}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}

      {!loadFollowers &&
        currentUser.following.map((followingId) => {
          const followingUser = allUsers.find((u) => u.id === followingId);
          const followerPic = `/src/images/profile-pictures/${followingUser.profilePic}`;

          return (
            <div key={followingUser.id} className="px-4 py-4">
              <Link
                to={
                  user && followingUser.id === user.id
                    ? "/myprofile"
                    : `/profile/${followingUser.id}`
                }
              >
                <div className="flex gap-4 items-start">
                  <img
                    className="w-12 h-12 object-cover flex-shrink-0  rounded-full"
                    src={followerPic}
                    alt={`Profile of ${followingUser.name}`}
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <h3 className="font-semibold ">{followingUser.name}</h3>
                      <p className="text-stone-500 text-sm">
                        @{followingUser.username}
                      </p>
                    </div>
                    <p className=" text-sm">{followingUser.bio}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default FollowersFollowings;
