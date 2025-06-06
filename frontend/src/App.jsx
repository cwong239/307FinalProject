import { Routes, Route, useLocation } from "react-router-dom";

import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import AboutPage from "./AboutPage";
import ImagesPage from "./ImagesPage";
import EditPage from "./EditPage";

function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Homepage />} />
      <Route path="/images" element={<ImagesPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/edit" element={<EditPage />} />
    </Routes>
  );
}

export default App;
