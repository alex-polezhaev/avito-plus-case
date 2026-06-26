import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    resetPasswordToken: {
      otp: {
        type: String,
        default: null,
      },
      OTPcreatedAtInMS: {
        type: Number,
        default: null,
      },
    },
    verification: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      hash: {
        type: String,
        default: null,
      },
      hashCreatedAtInMS: {
        type: Number,
        default: null,
      },
    },
    telegram: {
      user_token: String,
      chat_ids: [{
        chat_id: String,
        username: String,
      }],
    },
    transactions: [{
      order_id: String,
      title: String,
      transaction: String,
      date: Date,
      success: Boolean,
      message: String,
    }],
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'users' },
);

const User = mongoose.model('User', userSchema);

export default User;
