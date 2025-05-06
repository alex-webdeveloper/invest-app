import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import VKProvider from 'next-auth/providers/vk';
import type { Provider } from 'next-auth/providers';
import type { User } from '@/lib/placeholder-data';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { z } from 'zod';

async function getUser(email: string): Promise<User | undefined> {
	try {
		const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
		return user.rows[0];
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

const FormSchema = z.object({
	email: z.string().trim().email(),
	password: z.string().trim().min(6),
});

const providers: Provider[] = [
	Credentials({
		async authorize(credentials) {
			const parsedCredentials = FormSchema.safeParse(credentials);

			if (parsedCredentials.success) {
				const { email, password } = parsedCredentials.data;
				const user = await getUser(email);
				if (!user) return null;
				const passwordsMatch = await bcrypt.compare(password, user.password);

				if (passwordsMatch) return user;
			}
			console.log('Invalid credentials');
			return null;
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
	}),
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
	providers,
});
