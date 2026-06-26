import mongoose from 'mongoose';

const { Schema } = mongoose;

const fieldSchema = new Schema(
  {
    categoryName: String,
    tagAmount: Number,
    parent: String,
    templateLink: String,
    tags: [
      {
        tag: String,
        fieldLink: String,
        required: String,
        visible: Boolean,
        options: [String],
        title: String,
      },
    ],
  },
  { versionKey: false },
  { collection: 'fields' },
);

const Field = mongoose.model('Field', fieldSchema);

export default Field;
