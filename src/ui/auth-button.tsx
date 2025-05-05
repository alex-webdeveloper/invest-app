import { PowerIcon, UserIcon } from '@heroicons/react/24/outline';
import { signIn, signOut, auth } from '../auth';

export default async function AuthButton() {
  const session = await auth();
  const user = session?.user;

  return user ? (
    <form action={async () => {
      'use server';
      await signOut({ redirectTo: '/' });
    }}>
      <button className="cursor-pointer flex items-center gap-2 rounded-md bg-emerald-500 border text-foreground text-xs px-2 py-1 hover:bg-stone-700">
        <PowerIcon className="w-5 h-5" />
        <span className="hidden md:inline">Выйти</span>
      </button>
    </form>
  ) : (
    <form action={async () => {
      'use server';
      await signIn();
    }}>
      <button
        className="cursor-pointer flex items-center gap-2 rounded-md bg-stone-500 border text-foreground text-xs px-2 py-1 hover:bg-stone-700">
        <UserIcon className="w-5 h-5" />
        <span className="hidden md:inline">Войти</span>
      </button>
    </form >
  );
}