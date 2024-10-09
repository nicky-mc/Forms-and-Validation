const API_BASE_URL = "http://localhost:3000/api";

// Categories
export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return response.json();
};

export const createCategory = async (name) => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

// Posts
export const getPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  return response.json();
};

export const createPost = async (title, content, category_id) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content, category_id }),
  });
  return response.json();
};

// Tags
export const getTags = async () => {
  const response = await fetch(`${API_BASE_URL}/tags`);
  return response.json();
};

export const createTag = async (name) => {
  const response = await fetch(`${API_BASE_URL}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return response.json();
};

// Add other API calls as needed
