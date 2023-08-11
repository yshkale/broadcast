import { useNavigate } from "react-router-dom";
import ArrowLeft from "../icons/arrow-left.svg";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { toast } from "react-hot-toast";

function EditProfile() {
  const navigate = useNavigate();
  const { user, editProfile } = useAuth();

  const [newData, setNewData] = useState({
    name: user && user.name,
    bio: user && user.bio,
    location: user && user.location,
    website: user && user.website,
  });

  function handleChange(e) {
    e.preventDefault();

    const { name, value } = e.target;

    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit() {
    if (
      newData.name === user.name &&
      newData.bio === user.bio &&
      newData.location === user.location &&
      newData.website === user.website
    )
      return toast.error(
        "No changes made. Please edit your profile before saving."
      );
    else if (
      newData.name === "" ||
      newData.bio === "" ||
      newData.location === "" ||
      newData.website === ""
    )
      return toast.error("Oops! Please fill in the empty fields.");

    editProfile({
      name: newData.name,
      bio: newData.bio,
      location: newData.location,
      website: newData.website,
    });

    navigate("/myprofile");
  }

  return (
    <div className="lg:max-w-4xl lg:mx-[24rem]">
      <div className="flex gap-8 px-6 py-3 items-center border-b border-stone-700 lg:py-6">
        <img
          className="w-5 h-5 invert cursor-pointer"
          src={ArrowLeft}
          alt="Back arrow"
          onClick={() => navigate(-1)}
        />

        <h3 className="font-semibold tracking-wide mr-auto ">Edit Profile</h3>

        <button
          className="font-bold text-stone-900 border rounded-full bg-stone-50 px-4 py-2 border-stone-700 text-xs tracking-wider"
          onClick={() => handleSubmit()}
        >
          Save
        </button>
      </div>

      <form className="px-4 py-4 flex flex-col mt-2">
        <label className="font-semibold tracking-wide text-stone-500">
          Name
        </label>
        <input
          className="mb-3 text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          type="text"
          name="name"
          value={newData.name}
          placeholder="Name"
          onChange={(e) => handleChange(e)}
        />

        <label className="font-semibold tracking-wide text-stone-500">
          Bio
        </label>
        <input
          className="mb-3 text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          type="text"
          name="bio"
          value={newData.bio}
          placeholder="Bio"
          onChange={(e) => handleChange(e)}
        />

        <label className="font-semibold tracking-wide text-stone-500">
          Location
        </label>
        <input
          className="mb-3 text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          type="text"
          name="location"
          value={newData.location}
          placeholder="Location"
          onChange={(e) => handleChange(e)}
        />

        <label className="font-semibold tracking-wide text-stone-500">
          Website
        </label>
        <input
          className="mb-4 text-white w-full my-2 bg-black outline-none border border-stone-500 rounded px-2 py-4 placeholder:text-sm placeholder:text-stone-500 placeholder:tracking-wide focus:border focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          type="url"
          name="website"
          value={newData.website}
          placeholder="Website"
          onChange={(e) => handleChange(e)}
        />

        <p className="text-stone-500 text-xs lg:text-sm lg:mt-4">
          Fill in the form fields above to update your profile information. Your
          changes will be saved once you click the Save button.
        </p>
      </form>
    </div>
  );
}

export default EditProfile;
