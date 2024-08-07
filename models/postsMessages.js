import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  id: String,
  text: String,
  date: String,
  is_completed: Boolean,
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
