import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import PlaylistDetails from "./pages/playlist/PlaylistDetails";
import VideoPlayer from "./pages/video/VideoPlayer";
import Profile from "./pages/profile/Profile";
import Calendar from "./pages/calendar/Calendar";
import YouTubeVideos from "./pages/youtube/YouTubeVideos";
import Notes from "./pages/notes/Notes";
import Meetings from "./pages/meetings/Meetings";
import MeetingRoom from "./pages/meetings/MeetingRoom";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import HomeRoute from "./components/HomeRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<HomeRoute />} />

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/planner"
          element={<ProtectedRoute><Calendar /></ProtectedRoute>}
        />
        <Route
          path="/notes"
          element={<ProtectedRoute><Notes /></ProtectedRoute>}
        />
        <Route
          path="/youtube"
          element={
            <ProtectedRoute>
              <YouTubeVideos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/playlist/:id"
          element={
            <ProtectedRoute>
              <PlaylistDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/video/:id"
          element={
            <ProtectedRoute>
              <VideoPlayer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* <Route path="/meetings" element={<ProtectedRoute><Meetings /></ProtectedRoute>} />
        <Route path="/meetings/:id" element={<ProtectedRoute><MeetingRoom /></ProtectedRoute>} /> */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
