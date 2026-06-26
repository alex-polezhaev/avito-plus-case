import mongoose from 'mongoose';

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    is_used: {
      type: Boolean,
      default: false,
    },
    sheet_id: String,
    acc_id: String,
    spec_id: String,
    ad_id: String,
    service: {
      type: String,
      enum: ['slides', 'yandex'],
      required: true,
    },
    changes: Object,
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'tasks' },
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
