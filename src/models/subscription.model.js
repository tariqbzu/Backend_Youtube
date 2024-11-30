import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, // one who is subscribing
      ref: "User", // reference to the User model
    },
    channel: {
      type: Schema.Types.ObjectId, // one to whom subscriber is subscribing
      ref: "User", // reference to the User model
    },
  },
  {
    timestamps: true, // correct placement of schema options
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);





