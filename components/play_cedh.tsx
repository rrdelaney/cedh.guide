import { PropsWithChildren } from 'react';
import Image from 'next/image';

export function PlayCedhLayout({ children }: PropsWithChildren<{}>) {
  return <div className="grid gap-8 mb-24">{children}</div>;
}

export function PlayCedhCard({
  name,
  img,
  href,
  joinText = 'Join here',
  children,
}: PropsWithChildren<{
  name: string;
  img: string;
  href: string;
  joinText?: string;
}>) {
  return (
    <div className="flex h-full space-y-3 space-x-8 bg-blue-900 p-4 rounded-xl">
      <div className="relative w-32 h-32">
        <Image
          style={{ margin: 0 }}
          fill
          src={img}
          alt="logo"
          className="rounded-full"
        />
      </div>

      <div className="flex flex-col flex-1">
        <h2 className="break-all" style={{ margin: 0 }}>
          {name}
        </h2>
        {children}
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="w-48 bg-white text-gray-900 px-3 py-2 text-center hover:bg-gray-100 transition-colors text-sm"
        >
          {joinText} →
        </a>
      </div>
    </div>
  );
}
