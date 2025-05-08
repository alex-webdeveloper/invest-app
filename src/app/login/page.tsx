import LoginForm from '@/ui/login/login-form';
import SocialLoginButtons from '@/ui/login/social-login-buttons';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  robots: 'noindex, nofollow',
  alternates: {
    canonical: undefined,
  },
};

export default async function LoginPage(props:
  { searchParams: Promise<{ callbackUrl?: string }> }) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams?.callbackUrl || '/analytics';

  return (
    <section className="fixed px-4 inset-0 z-50 bg-black overflow-y-auto w-screen min-h-screen flex items-center justify-center">
      <div className="bg-white text-black max-w-md w-full rounded-xl shadow-lg p-6">
        <LoginForm />
        <SocialLoginButtons callbackUrl={callbackUrl} />
      </div>
    </section>
  );
}
