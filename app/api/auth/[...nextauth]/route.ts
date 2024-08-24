import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from '@utils/database';
import User from '@model/user';

// console.log('🚀 ~ GOOGLE_ID:', process.env.GOOGLE_ID);
// console.log('🚀 ~ GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // console.log('🚀 ~ session >>>>>>>>>>>>>>>>>>>>> ~ profile:', session);
      if (!session || !session.user) {
        return session;
      }
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser?._id.toString();
      return session;
    },
    async signIn({ profile }) {
      console.log('🚀 ~ signIn >>>>>>>>>>>>>>>>>>>>> ~ profile:', profile);
      if (!profile) return false;
      try {
        await connectToDB();
        const userExists = await User.findOne({ email: profile.email });
        if (!userExists) {
          User.create({
            email: profile.email,
            username: profile.name?.replace(' ', '').toLowerCase(),

            // stupid Profile interface is not update with google payload
            // @ts-ignore
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.error('MongoDB sign-in error!', error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
