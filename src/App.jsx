import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Task from "./pages/Task";
import Layout from "./components/Layout";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Task />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
