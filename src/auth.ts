import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import VKProvider from 'next-auth/providers/vk';
import type { Provider } from "next-auth/providers"




const providers: Provider[] = [
	Credentials({
    credentials: { password: { label: "Password", type: "password" } },
    authorize(c) {
      if (c.password !== "password") return null
      return {
        id: "test",
        name: "Test User",
        email: "test@example.com",
      }
    },
	}),
	GitHubProvider({
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  }),
	GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
	VKProvider({
		clientId: process.env.VK_CLIENT_ID!,
		clientSecret: process.env.VK_CLIENT_SECRET!,
		authorization: {
			url: "https://oauth.vk.com/authorize",
			params: { scope: "email" },
		},
		checks: ['state'],
	})
];

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === 'function') {
			const providerData = provider();
			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	})
	.filter((provider) => provider.id !== 'credentials');
	
export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	pages: {
		signIn: '/login',
	},
	providers,
});
