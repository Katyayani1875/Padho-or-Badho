import mongoose from 'mongoose';

const i18nString = {
  type: Map,
  of: String,
};

const badgeSchema = new mongoose.Schema({
  name: i18nString,
  description: i18nString,
  iconUrl: { type: String, required: true },
  criteria: {
    type: String, 
    required: true,
  },
  criteriaValue: { type: String }, 
}, { timestamps: true });

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;