import { createContext, useContext, useState, useCallback } from "react";
import { InitialTweets } from "../dB/tweets";

const TweetContext = createContext();

export function TweetProvider({ children }) {
  const [tweets, setTweets] = useState(InitialTweets);

  const addTweet = useCallback((newTweet) => {
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  }, []);

  const deleteTweet = useCallback(
    (tweetId) => {
      const updatedTweets = tweets.filter((t) => t.id !== tweetId);
      setTweets(updatedTweets);
    },
    [tweets]
  );

  const markBookmark = useCallback((tweetId) => {
    setTweets((prevTweets) => {
      return prevTweets.map((t) => {
        return t.id === tweetId ? { ...t, bookmark: !t.bookmark } : t;
      });
    });
  }, []);

  const likeTweet = useCallback((tweetId) => {
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
  }, []);

  const addComment = useCallback((tweetId, newComment) => {
    setTweets((prevTweets) => {
      return prevTweets.map((t) =>
        t.id === tweetId ? { ...t, comments: [newComment, ...t.comments] } : t
      );
    });
  }, []);

  const addCommentLike = useCallback((commentId) => {
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
  }, []);

  const deleteComment = useCallback((tweetId, commentId) => {
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
  }, []);

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
