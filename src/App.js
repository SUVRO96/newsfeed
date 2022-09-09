import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Feeds from "./components/feeds/Feeds";
import Header from "./components/common/Header";
import Login from "./components/users/Login";
import Registration from "./components/users/Registration";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Feeds />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
