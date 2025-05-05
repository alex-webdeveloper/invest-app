'use client';

import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/analytics';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <h1 className="text-2xl text-center font-semibold">Войдите чтобы продолжить</h1>

        <label className="block mt-4 text-sm font-medium text-gray-700" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <input
            className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="email"
            type="email"
            name="email"
            required
            placeholder="Введите email"
            autoComplete="email"
          />
          <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
        </div>

        <label className="block mt-4 text-sm font-medium text-gray-700" htmlFor="password">
          Пароль
        </label>
        <div className="relative">
          <input
            className="w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            id="password"
            type="password"
            name="password"
            required
            minLength={6}
            placeholder="Введите пароль"
            autoComplete="current-password"
          />
          <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
        </div>
      </div>

      <input type="hidden" name="redirectTo" value={callbackUrl} />

      <Button type="submit" className="w-full" aria-disabled={isPending}>
        Войти
        <ArrowRightIcon className="ml-auto h-5 w-5 text-white" />
      </Button>

      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-red-600 mt-2" aria-live="polite">
          <ExclamationCircleIcon className="h-5 w-5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </form>
  );
}
