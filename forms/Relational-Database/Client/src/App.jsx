import "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Categories from "./components/categories/Catagories";
import Posts from "./components/posts/Posts";
import Tags from "./components/tags/Tags";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/tags">Tags</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
