import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection('users');

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        return { email: user.email,username:user.username };
        
      },
    }),
  ],
  callbacks:{
    jwt: async ({ token, user }) =>{

      if (user) {
        token.uid = user;
      }

      return token
    },
    session: async ({ session, token }) => {

      //console.log(token);
        // here we put session.useData and put inside it whatever you want to be in the session
        // here try to console.log(token) and see what it will have 
        // sometimes the user get stored in token.uid.userData
        // sometimes the user data get stored in just token.uid
        session.userData = {
          
          
          username:token.uid.username,
          email:token.uid.email,
         
        }

      return session;
    },
  },

});
