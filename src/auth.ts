import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import type { Provider } from 'next-auth/providers';
//import type { TokenSet } from '@auth/core/types';
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

// Кастомный VK OAuth провайдер
// Типы для данных ВК
interface VkProfile {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  photo_100?: string;
}

export const VkOAuthProvider: Provider = {
  id: 'vk',
  name: 'VK',
  type: 'oauth',
  checks: ['state'], // ← Отключаем PKCE, используем state для безопасности
  authorization: {
    url: 'https://oauth.vk.com/authorize',
    params: { scope: 'email' },
  },
  token: {
    url: 'https://oauth.vk.com/access_token',
    async request({ provider, tokens }) {
      const params = new URLSearchParams();
      params.append('client_id', provider.clientId);
      params.append('client_secret', provider.clientSecret);
      params.append('redirect_uri', provider.callbackUrl);
      if (tokens.code) {
        params.append('code', tokens.code);
        params.append('grant_type', 'authorization_code');
      }
      const res = await fetch(provider.token.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
      const data = await res.json();

      return {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        scope: provider.scope,
        token_type: 'Bearer',
        id_token: Buffer.from(JSON.stringify({ sub: String(data.user_id) })).toString('base64') + '..',
      };
    },
  },
  userinfo: {
    url: 'https://api.vk.com/method/users.get?v=5.131&fields=email,photo_100',
    async request({ tokens, provider }) {
      const accessToken = tokens.access_token;
      const res = await fetch(
        `https://api.vk.com/method/users.get?v=5.131&access_token=${accessToken}&fields=email,photo_100`,
        {
          method: 'GET',
        }
      );
      const data: { response: [VkProfile] } = await res.json();
      const user = data.response?.[0];

      if (!user) throw new Error('Failed to fetch user data from VK');

      return {
        id: String(user.id),
        name: `${user.first_name} ${user.last_name}`,
        email: user.email || null,
        image: user.photo_100 || null,
      };
    },
  },
  options: {
    clientId: process.env.VK_CLIENT_ID!,
    clientSecret: process.env.VK_CLIENT_SECRET!,
  },
};

////////
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
	VkOAuthProvider
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
