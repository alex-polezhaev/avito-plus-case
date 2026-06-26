import mongoose from 'mongoose';

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    table_id: String,
    table_link: String,
    yandex_token: {
      token: String,
      refresh_token: String,
      expiration_date: Date,
    },
    avito: {
      clientId: String,
      clientSecret: String,
      id: String,
      name: String,
      phone: String,
      profile_url: String,
      email: String,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    renewable: {
      type: Boolean,
      default: true,
    },
    month_price: {
      type: Number,
      default: 1490,
    },
    expire_at: {
      type: Date,
      default: new Date(new Date().setDate(new Date().getDate() + 7)),
    },
    automatic: {
      renew_blocked: {
        type: Boolean,
        default: false,
      },
      renew_old: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  { collection: 'accounts' },
);

const Account = mongoose.model('Account', accountSchema);

export default Account;
