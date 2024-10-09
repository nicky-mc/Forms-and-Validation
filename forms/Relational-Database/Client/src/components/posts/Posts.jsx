import { useState, useEffect } from "react";
import {
  getPosts,
  createPost,
  getCategories,
  getTags,
  deletePost,
} from "../../services/api";
import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category_id: "",
    tag_id: "",
  });

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    fetchTags();
  }, []);

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const fetchTags = async () => {
    const data = await getTags();
    setTags(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(
      newPost.title,
      newPost.content,
      newPost.category_id,
      newPost.tag_id
    );
    setNewPost({ title: "", content: "", category_id: "", tag_id: "" });
    fetchPosts();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      fetchPosts(); // Refresh the posts after deleting
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="posts">
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Category: {post.category_name || "N/A"}</p>
            <p>Tag: {post.tag_name || "N/A"}</p>
            <button className="delete" onClick={() => handleDelete(post.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          placeholder="Content"
          required
        />
        <select
          name="category_id"
          value={newPost.category_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          name="tag_id"
          value={newPost.tag_id}
          onChange={handleInputChange}
        >
          <option value="">Select a tag (optional)</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default Posts;
