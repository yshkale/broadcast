import { profileData } from "../dB/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../dB/users";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";

function CreateProfile() {
  const date = new Date();

  const [profile, setProfile] = useState({
    bio: "",
    website: "",
    location: "",
    joiningDate: { month: date.getMonth(), year: date.getFullYear() },
  });

  const { login, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  function handleChange(e) {
    e.preventDefault();

    const { name, value, files } = e.target;

    if (name === "profilePic" && files.length > 0) {
      const file = files[0];
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        localStorage.setItem("profilePic", fileReader.result);
      };
    } else {
      setProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  let currentUser = users.find((u) => u.id === users[users.length - 1].id);

  function handleSubmit(e) {
    e.preventDefault();
    profileData(profile);

    if (currentUser.username && currentUser.password)
      login(currentUser.username, currentUser.password);
  }

  useEffect(
    function () {
      if (isAuthenticated) {
        toast.success(`Logged in as ${currentUser.username}`);
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate, currentUser.username]
  );

  return (
    <div className="lg:mx-96 lg:my-28 lg:max-w-2xl">
      <div className="px-8 pt-4 ">
        <h1 className="text-base font-medium ">Step 2 of 2</h1>
      </div>

      <div className="px-8 mt-8">
        <h2 className="text-3xl tracking-wide font-bold text-stone-100">
          We&apos;re almost there. Set up your Profile.
        </h2>

        <form className="py-6" onSubmit={handleSubmit}>
          <textarea
            className="text-white w-full h-20  bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="text"
            name="bio"
            value={profile.bio}
            placeholder="Bio"
            onChange={handleChange}
            maxLength={60}
            required
          />

          <input
            className="text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="url"
            name="website"
            value={profile.website}
            placeholder="Website"
            onChange={handleChange}
            required
          />

          <input
            className="text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            type="text"
            name="location"
            value={profile.location}
            placeholder="Location"
            onChange={handleChange}
            required
          />

          <div className="mt-2 ">
            <label className=" text-stone-400 text-sm ">
              Choose a profile picture
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="profilePic"
                className=" my-2 w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <button className="h-12 rounded-full bg-white text-black font-semibold w-full p-2 mt-8  hover:bg-black hover:text-stone-50 hover:border hover:border-stone-700 transition-all">
            Finish
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProfile;
