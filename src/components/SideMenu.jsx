import closeIcon from "../icons/closeIcon.svg";
import ProfileIcon from "../icons/profile.svg";
import BookmarkIcon from "../icons/bookmark.svg";
import LogoutIcon from "../icons/logout.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function SideMenu({ closeSideMenu }) {
  const { user, logout } = useAuth();
  const userProfilePic =
    user && user.profilePic
      ? `/src/images/profile-pictures/${user.profilePic}`
      : localStorage.getItem("profilePic");

  return (
    <div className="w-10/12 fixed inset-y-0 left-0 border-r border-stone-700 bg-black px-4 pt-4 pb-6 z-50">
      <div className="flex justify-between">
        <h2>Account info</h2>
        <img
          className="w-4 invert"
          src={closeIcon}
          onClick={closeSideMenu}
          alt="close icon"
        />
      </div>

      <div className="my-6 flex flex-col gap-2">
        <img
          className="mb-2 w-12 h-12 object-cover rounded-full"
          src={userProfilePic}
          alt="logged in users profile picture"
        />
        <div className="mb-2">
          <p className="font-semibold ">{user && user.name}</p>
          <p className="text-stone-500 text-sm">@{user && user.username}</p>
        </div>

        <NavLink to={`/followersfollowings/${user && user.id}`}>
          <div className="flex gap-4 ">
            <p className="font-light text-stone-500 text-sm">
              <span className="font-semibold text-stone-50">
                {user && user.following.length}
              </span>{" "}
              Following
            </p>
            <p className="font-light text-stone-500 text-sm">
              <span className="font-semibold text-stone-50">
                {user && user.followers.length}
              </span>{" "}
              Followers
            </p>
          </div>
        </NavLink>
      </div>

      <nav className="my-8">
        <ul className="flex flex-col gap-6">
          <NavLink to={"/myprofile"} className="flex gap-8 items-center">
            <img className="w-5 invert" src={ProfileIcon} alt="profile icon" />
            <p className="font-bold tracking-wide text-lg ">Profile</p>
          </NavLink>
          <NavLink to={"/bookmarks"} className="flex gap-8 items-center">
            <img className="w-4" src={BookmarkIcon} alt="profile icon" />
            <p className="font-bold tracking-wide text-lg ">Bookmarks</p>
          </NavLink>
          <div className="flex gap-8 items-center" onClick={logout}>
            <img className="w-5 invert" src={LogoutIcon} alt="profile icon" />
            <p className="font-bold tracking-wide text-lg ">Logout</p>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default SideMenu;
