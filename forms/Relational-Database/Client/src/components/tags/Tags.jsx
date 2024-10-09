import { useState, useEffect } from "react";
import { getTags, createTag } from "../../services/api";
import "./Tags.css";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const data = await getTags();
    setTags(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTag(newTagName);
    setNewTagName("");
    fetchTags();
  };

  return (
    <div className="tags">
      <h2>Tags</h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="New tag name"
        />
        <button type="submit">Add Tag</button>
      </form>
    </div>
  );
};

export default Tags;
