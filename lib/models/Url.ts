import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  clicks: { type: Number, default: 0 },
});

export default mongoose.models.Url || mongoose.model("Url", UrlSchema);
