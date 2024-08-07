import PostMessage from "../models/postsMessages.js";

// Get all posts
export const getTodos = async (req, res) => {
  try {
    const postsMessages = await PostMessage.find();

    console.log(postsMessages);
    res.status(200).json(postsMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create a new post
export const createTodo = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a specific todo by ID (using PATCH for partial updates)
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedTodo = req.body;

  try {
    // Find the todo item by ID and update it
    const todo = await PostMessage.findByIdAndUpdate(id, updatedTodo, {
      new: true,
      runValidators: true,
    });

    // Check if the todo item was found
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // Send the updated todo item back to the client
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a specific todo by ID
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the todo item by ID
    const todo = await PostMessage.findByIdAndDelete(id);

    // Check if the todo item was found
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    // Send a success message to the client
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
