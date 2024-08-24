import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    unique: [true, 'Username already exists!'],
    required: [true, 'Email is required!'],
    match: [/^[a-zA-Z0-9._-]{8,20}$/, 'Size from 8 to 20 chars and alphanumeric'],
  },
  image: { type: String },
});

const User = models.User || model('User', userSchema);
export default User;
