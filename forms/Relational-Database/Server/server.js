// we need to install express, cors, dotenv, pg
// we import our dependencies
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

// need to configure our .env file
dotenv.config();

// we create a new express app
const app = express();

// tell express to use json
app.use(express.json());
// tell express to use cors
app.use(cors());

// creating a new pool for my database connection
const dbConnectionString = process.env.DB_URL;
if (!dbConnectionString) {
  throw new Error("DB_URL is not defined in the environment variables");
}

// creating a new pool for my database connection
export const db = new pg.Pool({ connectionString: dbConnectionString });

// we define our port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} and built on Rock and Roll`);
});

// now write an end point for our root route to test our server
app.get("/", (req, res) => {
  res.json({ message: "HAIL to the Queen baby" });
});

// Categories CRUD operations
app.get("/api/categories", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/categories", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO categories (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await db.query(
      "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Posts CRUD operations
app.get("/api/posts", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM posts");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/posts", async (req, res) => {
  const { title, content, category_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO posts (title, content, category_id) VALUES ($1, $2, $3) RETURNING *",
      [title, content, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category_id } = req.body;
  try {
    const result = await db.query(
      "UPDATE posts SET title = $1, content = $2, category_id = $3 WHERE id = $4 RETURNING *",
      [title, content, category_id, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Tags CRUD operations
app.get("/api/tags", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM tags");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/tags", async (req, res) => {
  const { name } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO tags (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/tags/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const result = await db.query(
      "UPDATE tags SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// params is used to get the id of the tag to be deleted
//this is a dynamic parameter
app.delete("/api/tags/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM tags WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Posts_Tags operations
app.post("/api/posts/:postId/tags", async (req, res) => {
  const { postId } = req.params;
  const { tagId } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO posts_tags (post_id, tag_id) VALUES ($1, $2) RETURNING *",
      [postId, tagId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding tag to post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// the below code is to delete a tag from a post by its id
app.delete("/api/posts/:postId/tags/:tagId", async (req, res) => {
  const { postId, tagId } = req.params;
  // try to delete the tag from the post
  try {
    const result = await db.query(
      "DELETE FROM posts_tags WHERE post_id = $1 AND tag_id = $2 RETURNING *",
      [postId, tagId]
    );
    //if the tag is not found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post-Tag relationship not found" });
    }
    res.status(204).send();
  } catch (error) {
    // then catch the error
    console.error("Error removing tag from post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
