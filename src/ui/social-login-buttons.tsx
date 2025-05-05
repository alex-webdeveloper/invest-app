import { signIn, providerMap } from "@/auth";
import { FcGoogle } from 'react-icons/fc';
import { FaGithub, FaVk } from 'react-icons/fa';

const icons: Record<string, React.ReactNode> = {
  google: <FcGoogle className="h-5 w-5" />,
  github: <FaGithub className="h-5 w-5 text-black" />,
  vk: <FaVk className="h-5 w-5 text-blue-500" />,
};

export default function SocialLoginButtons({
  callbackUrl,
}: { callbackUrl: string }) {

  return (
    <div className="mt-6 space-y-2">
      <h2 className="text-2xl text-center font-semibold mb-6">Вход через соцсети</h2>
      {providerMap.map((provider) => (
        <form key={provider.id}
          action={async () => {
            "use server"
            try {
              await signIn(provider.id, {
                redirectTo: callbackUrl,
              })
            } catch (error) {
              throw error;
            }
          }}
        >
          <button
            type="submit"
            className="cursor-pointer flex items-center gap-3 w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {icons[provider.id] ?? null}
            <span>Войти через {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  );
}
