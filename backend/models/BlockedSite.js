import mongoose from 'mongoose';

const blockedSiteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const BlockedSite = mongoose.model('BlockedSite', blockedSiteSchema);

export default BlockedSite;
