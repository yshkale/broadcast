import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import EmojiIcon from "../icons/emoji.svg";
import NewCastIcon from "../icons/newcast.svg";
import { useAuth } from "../contexts/AuthContext";
import { useTweets } from "../contexts/TweetsContext";
import { toast } from "react-hot-toast";

function CreateTweet() {
  const { user } = useAuth();
  const { addTweet } = useTweets();

  const userProfilePic =
    user && user.profilePic
      ? `/src/images/profile-pictures/${user.profilePic}`
      : localStorage.getItem("profilePic");

  const now = new Date();

  // Format time (HH:mm AM/PM)
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${minutes
    .toString()
    .padStart(2, "0")} ${amOrPm}`;

  // Format date (MMM DD, YYYY)
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const formattedDate = `${month} ${day}, ${year}`;

  const [newTweet, setNewTweet] = useState({
    id: Math.floor(Math.random() * 10000),
    userId: user && user.id,
    content: "",
    mediaContent: "",
    likes: 0,
    comments: [],
    timestamp: formattedTime,
    date: formattedDate,
    bookmark: false,
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setNewTweet((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleEmojiSelect = (emoji) => {
    setNewTweet((prevState) => ({
      ...prevState,
      content: prevState.content + emoji.native,
    }));
    setShowEmojiPicker(false);
  };

  const handleSubmit = () => {
    if (!newTweet.content.trim()) {
      return;
    }

    addTweet(newTweet);
    toast.success("Your cast was sent");
    setNewTweet((prevState) => ({
      ...prevState,
      id: Math.floor(Math.random() * 10000), // Resetting the id to a new unique value
      content: "", // Clearing the content field
      mediaContent: "", // Clearing the mediaContent field
    }));
  };

  return (
    <>
      <div className="flex px-4 pt-4 pb-2 border-b border-stone-800">
        <img
          src={userProfilePic}
          className="w-10 h-10 object-cover rounded-full"
          alt="profile picture of current user"
        />

        <div className="ml-4 flex-1 mb-2">
          <textarea
            className="w-full bg-black border-none outline-none text-md resize-none placeholder:text-stone-500 placeholder:text-lg"
            rows="4"
            name="content"
            value={newTweet.content}
            onChange={handleChange}
            placeholder="What's happening?!"
            maxLength={150}
          />

          <div className="flex gap-6 pr-4 items-center">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-4 h-4 invert mr-auto"
            >
              <img src={EmojiIcon} alt="select media from gallery" />
            </button>

            <button
              className="flex gap-1 items-center px-4 py-2 bg-purple-700 rounded-full text-sm"
              onClick={handleSubmit}
            >
              <img
                className="w-4 inline fill-transparent"
                src={NewCastIcon}
                alt="cast icon"
              />
              Cast
            </button>
          </div>
        </div>
      </div>

      {showEmojiPicker && (
        <Picker data={data} onEmojiSelect={handleEmojiSelect} />
      )}
    </>
  );
}

export default CreateTweet;
