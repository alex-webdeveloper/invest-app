'use client';
 
import { useEffect } from 'react';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center pt-16 p-4 text-red-700 text-lg">
      <h2 className="text-center">{error.message}</h2>
      <button
        className="cursor-pointer mt-4 rounded-md bg-emerald-500 px-4 py-2 text-sm text-white transition-colors hover:bg-emerald-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}