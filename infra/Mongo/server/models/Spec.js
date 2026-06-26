import mongoose from 'mongoose';

const { Schema } = mongoose;

const specSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    acc_id: {
      type: String,
      required: true,
    },
    sheet_id: String,
    options_sheet_id: String,
    stat: {
      total_ads: {
        type: Number,
        default: 0,
      },
      active_ads: {
        type: Number,
        default: 0,
      },
      old_ads: {
        type: Number,
        default: 0,
      },
      blocked_ads: {
        type: Number,
        default: 0,
      },
      rejected_ads: {
        type: Number,
        default: 0,
      },
      archived_ads: {
        type: Number,
        default: 0,
      },
      deleted_ads: {
        type: Number,
        default: 0,
      },
      waiting_ads: {
        type: Number,
        default: 0,
      },
      views1: {
        type: Number,
        default: 0,
      },
      messages1: {
        type: Number,
        default: 0,
      },
      likes1: {
        type: Number,
        default: 0,
      },
      views7: {
        type: Number,
        default: 0,
      },
      messages7: {
        type: Number,
        default: 0,
      },
      likes7: {
        type: Number,
        default: 0,
      },
      views30: {
        type: Number,
        default: 0,
      },
      messages30: {
        type: Number,
        default: 0,
      },
      likes30: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'specs' },
);

const Spec = mongoose.model('Spec', specSchema);

export default Spec;
