import { createContext, useContext, useReducer } from "react";
import users from "../dB/users";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  allUsers: users,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };

    case "edit-profile": {
      const { name, bio, location, website } = action.payload;

      const updatedUser = { ...state.user, name, bio, location, website };

      return { ...state, user: updatedUser };
    }

    case "follow": {
      const userIdToFollow = action.payload;
      const userToFollow = state.allUsers.find((u) => u.id === userIdToFollow);

      // Check if the user is already being followed
      if (!state.user.following.includes(userIdToFollow)) {
        userToFollow.followers.push(state.user.id);
        const currentUser = { ...state.user };
        currentUser.following.push(userIdToFollow);
        const updatedAllUsers = state.allUsers.map((u) =>
          u.id === currentUser.id ? currentUser : u
        );
        return { ...state, user: currentUser, allUsers: updatedAllUsers };
      }
      return state;
    }

    case "unfollow": {
      const userIdToUnfollow = action.payload;
      const userToUnfollow = state.allUsers.find(
        (u) => u.id === userIdToUnfollow
      );

      // Check if the user is being followed
      if (state.user.following.includes(userIdToUnfollow)) {
        userToUnfollow.followers = userToUnfollow.followers.filter(
          (followerId) => followerId !== state.user.id
        );

        const currentUserUnfollowed = { ...state.user };
        currentUserUnfollowed.following =
          currentUserUnfollowed.following.filter(
            (followingId) => followingId !== userIdToUnfollow
          );

        const updatedAllUsers = state.allUsers.map((u) =>
          u.id === currentUserUnfollowed.id ? currentUserUnfollowed : u
        );

        return {
          ...state,
          user: currentUserUnfollowed,
          allUsers: updatedAllUsers,
        };
      }
      return state;
    }

    default:
      toast.error("Unknown action");
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated, allUsers } = state;

  function login(username, password) {
    const currentUser = users.find(
      (u) => u.username === username.toLowerCase()
    );

    if (!currentUser) toast.error("Incorrect Username!");

    if (
      currentUser.username === username &&
      currentUser.password === password
    ) {
      dispatch({ type: "login", payload: currentUser });
    } else {
      toast.error("Incorrect Password!");
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    toast.success("Logged out");
  }

  function follow(userIdToFollow) {
    dispatch({ type: "follow", payload: userIdToFollow });
  }

  function unfollow(userIdToUnfollow) {
    dispatch({ type: "unfollow", payload: userIdToUnfollow });
  }

  function editProfile(newData) {
    dispatch({ type: "edit-profile", payload: newData });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        allUsers,
        login,
        logout,
        follow,
        unfollow,
        editProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
