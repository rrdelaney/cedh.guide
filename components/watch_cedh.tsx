import { PropsWithChildren } from 'react';

export function WatchCedhLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-24">
      {children}
    </div>
  );
}

export function WatchCedhCard({
  href,
  children,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <div className="flex flex-col h-full space-y-3">
      {children}

      <div className="flex-1" />
      <a
        href={href}
        target="_blank"
        className="bg-white text-gray-900 px-3 py-2 text-center hover:bg-gray-100 transition-colors text-md"
      >
        Watch
      </a>
    </div>
  );
}
