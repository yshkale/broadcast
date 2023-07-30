import { createContext, useContext, useState } from "react";
import { InitialTweets } from "../dB/tweets";

const TweetContext = createContext();

export function TweetProvider({ children }) {
  const [tweets, setTweets] = useState(InitialTweets);

  function addTweet(newTweet) {
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  }

  function deleteTweet(tweetId) {
    const updatedTweets = tweets.filter((t) => t.id !== tweetId);
    setTweets(updatedTweets);
  }

  function markBookmark(tweetId) {
    setTweets((prevTweets) => {
      return prevTweets.map((t) => {
        return t.id === tweetId ? { ...t, bookmark: !t.bookmark } : t;
      });
    });
  }

  function likeTweet(tweetId) {
    setTweets((prevTweets) => {
      return prevTweets.map((t) =>
        t.id === tweetId
          ? {
              ...t,
              likes: t.isLiked ? t.likes - 1 : t.likes + 1,
              isLiked: !t.isLiked,
            }
          : t
      );
    });
  }

  function addComment(tweetId, newComment) {
    setTweets((prevTweets) => {
      return prevTweets.map((t) =>
        t.id === tweetId ? { ...t, comments: [newComment, ...t.comments] } : t
      );
    });
  }

  function addCommentLike(commentId) {
    setTweets((prevTweets) => {
      return prevTweets.map((t) => ({
        ...t,
        comments: t.comments.map((c) =>
          c.id === commentId
            ? {
                ...c,
                likes: c.isLiked ? c.likes - 1 : c.likes + 1,
                isLiked: !c.isLiked,
              }
            : c
        ),
      }));
    });
  }

  function deleteComment(tweetId, commentId) {
    setTweets((prevTweets) => {
      return prevTweets.map((t) =>
        t.id === tweetId
          ? {
              ...t,
              comments: t.comments.filter((c) => c.id !== commentId),
            }
          : t
      );
    });
  }

  return (
    <TweetContext.Provider
      value={{
        tweets,
        addTweet,
        markBookmark,
        likeTweet,
        addComment,
        addCommentLike,
        deleteTweet,
        deleteComment,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
}

export function useTweets() {
  return useContext(TweetContext);
}
