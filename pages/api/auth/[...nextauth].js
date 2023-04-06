import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import {
  MongoDBAdapter
} from '@next-auth/mongodb-adapter';
import User from "../../../models/Users";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from './mongodb'
import bcrypt from "bcrypt";
import db from "../../../utils/db";
db.connectDb();
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [

    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith"
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        const user = await User.findOne({
          email
        });


        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return SingInUser({
            password,
            user
          });
        } else {
          throw new Error("this Email does not exist")

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    }),
    // OAuth authentication providers...
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = token.sub || user._id.toSting();
      session.user.role = user.role || "user";
      token.role = user.role || "user";
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
})


const SingInUser = async ({
  password,
  user
}) => {
  if (!user.password) {
    throw new Error("Please Enter Your Password");
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Email or Password is Wrong!")
  }
  return user;
}