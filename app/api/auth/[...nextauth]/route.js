import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import LinkedinProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
// import mongoose from "mongoose";
import User from "@/models/user";
import Payment from "@/models/Payment";
// await mongoose.connect("mongodb://localhost:27017/getchai")
import connectDB from "@/db/connectDb";


export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    LinkedinProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    // Passwordless / email sign in
    //   EmailProvider({
    //     server: process.env.MAIL_SERVER,
    //     from: 'NextAuth.js <no-reply@example.com>'
    //   }),
  ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if (account.provider === "github") {
          try {
              await connectDB();
      
              // Extract email from account, ensure it's defined
              const email = profile.email; // Ensure this is the correct path
              if (!email) {
                  console.error('Email is undefined or null');
                  return false;
              }
              console.log('Email:', email);
      
              // Check if user already exists in the database
              const currentUser = await User.findOne({ email: email });
              console.log('Current user:', currentUser);
      
              if (!currentUser) {
                  // Create a new user
                  const newUser = new User({
                      email: email,
                      username: email.split("@")[0],
                  });
                  await newUser.save();
                  console.log('New user created:', newUser);
              } else {
                  console.log('User already exists:', currentUser);
              }
          } catch (error) {
              console.error('Error while processing user:', error);
              return res.status(500).json({ error: 'Internal Server Error' });
          }
          // else{
          //   user.name= currentuser.username
          // }
          // close the connect
          return true
        }
      },
      async session({session, user, token}){
        const dbUser = await User.findOne({email: session.user.email})
        console.log(dbUser)
        session.user.name= dbUser.username
        return session
      },
    },
});

export {authOptions as GET, authOptions as POST};
