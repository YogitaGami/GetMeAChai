"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDb";
import User from "@/models/user";


export const initiate = async (amount, to_username, paymentform) => {
  await connectDB();
  // fetch the secret of the user who is getting the payment
  let user = await User.findOne({username: to_username})
  const secret = user.razorpaysecret

  var instance = new Razorpay({
    key_id: user.razorpayid,
    key_secret: secret,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  }

  let x;
  try {
    x = await instance.orders.create(options);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Could not create order. Please try again.");
  }

   // Validate payment form fields
   if (!paymentform.name || !paymentform.message) {
    throw new Error("Invalid payment form data.");
  }

//   create a payment object which shows a pending payment in the database
  try {
    await Payment.create({oid: x.id, amount:  Number.parseInt(amount) / 100, to_user: to_username, name:paymentform.name, message: paymentform.message})
  }
  catch (error) {
    console.error("Error saving payment to database:", error);
    throw new Error("Could not save payment details. Please try again.");
  }
  return x
};

export const fetchuser= async(username) => {
  await connectDB()
  let u = await User.findOne({username: username})
  let user = u.toObject({flattenObjectIds: true})
  return user
}

export const fetchpayments= async(username) => {
  await connectDB()
  // find all payments sorted by decreasing order of amount and flatten object ids
  let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).limit(10).lean()
  return p
}

export const updateProfile = async(data, oldusername) =>{
  await connectDB()
  let ndata = Object.fromEntries(data)
  // If the username is being updated, Check if username is available
  if(oldusername !== ndata.username){
    let u = await User.findOne({username: ndata.username})
    if(u){
      return {error: "Username already exists"}
    }
    // Now update all the usernames in the Payments table
    await Payment.updateMany({to_user: oldusername}, {to_user: ndata.username})
    await User.updateOne({email: ndata.email}, ndata)

  }
  else{
    await User.updateOne({email: ndata.email}, ndata)
  }

}
