import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth";
//import { FailedLoginInterface, SuccessLoginInterface } from "@/Interfaces/LoginInterfaces";
export const authOptions : AuthOptions ={
    providers: [
        CredentialsProvider({
            name: "Route",
            credentials: {
                email: { placeholder: 'ahmed@gmail.com', type: 'email' },
                password: { label: "enter your password", type: 'password' }
            },
            async authorize(data) {

                const responce = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
                    method: 'POST',
                    body: JSON.stringify({ email: data?.email, password: data?.password }),
                    headers: { "content-type": "application/Json" }
                });
                const payload = await responce.json();

                if (responce) {

                    return {
                        id: payload.user.email,
                        user: payload.user,
                        token: payload.token
                    };

                } else {

                    throw new Error(payload.message)
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.user = user.user;
                token.token = user.token;
            }
            return token;
        },

        async session({ session, token }) {

            if (token) {
                session.user = token.user
                session.token = token.token
            }
            return session
        },
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
}