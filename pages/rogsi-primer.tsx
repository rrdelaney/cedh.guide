import Error from 'next/error';
import { useEffect, useState } from 'react';

function Loading() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-10 w-10 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export default function Page() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const offset = Math.floor(Math.random() * 1000);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000 + offset);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex flex-col mt-10 justify-center items-center space-y-5 text-center">
      <h1 className="text-3xl font-bold leading-tight">
        DO NOT DISTRIBUTE — RogSi Primer
      </h1>

      <h2>For internal use ONLY.</h2>
      <h2 className="text-bold">
        Grixis deck where we look to resolve our powerful enchantments to win
        the game
      </h2>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="h-[75vh] w-full overflow-hidden relative">
          <div className="absolute bottom-0 inset-x-0">
            <Error statusCode={403} title="Not Authorized" />
          </div>
        </div>
      )}
    </div>
  );
}
