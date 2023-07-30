import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageNotFound from "./pages/Pagenotfound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateProfile from "./pages/CreateProfile";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import AppLayout from "./pages/AppLayout";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage";
import TweetPage from "./pages/TweetPage";
import MyProfilePage from "./pages/MyProfilePage";
import { TweetProvider } from "./contexts/TweetsContext";
import BookmarksPage from "./pages/BookmarksPage";
import FollowersFollowings from "./pages/FollowersFollowings";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <AuthProvider>
      <TweetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="create-profile" element={<CreateProfile />} />

            <Route
              index
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="profile/:userId"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="tweet/:tweetId"
              element={
                <ProtectedRoute>
                  <TweetPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="myprofile"
              element={
                <ProtectedRoute>
                  <MyProfilePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="followersfollowings/:userId"
              element={
                <ProtectedRoute>
                  <FollowersFollowings />
                </ProtectedRoute>
              }
            />

            <Route
              path="bookmarks"
              element={
                <ProtectedRoute>
                  <BookmarksPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </TweetProvider>

      <Toaster
        position="bottom-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 2000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "12px",
            maxWidth: "400px",
            padding: "12px 16px",
            borderRadius: "10px",
            background: "#292524",
            color: "#fafaf9",
          },
        }}
      />
    </AuthProvider>
  );
}

export default App;
