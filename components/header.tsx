import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

function HeaderLink({ href, children }: PropsWithChildren<{ href: string }>) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={cn('text-gray-300 transition-colors hover:text-gray-100', {
          underline: router.pathname === href,
        })}
      >
        {children}
      </a>
    </Link>
  );
}

export function PageHeader() {
  return (
    <div className="flex items-center space-x-4 p-6">
      <Link href="/">
        <a className="flex-1 text-3xl font-bold">What is cEDH?</a>
      </Link>

      <HeaderLink href="/philosophy">Philosophy</HeaderLink>
      <HeaderLink href="/decks">Decks</HeaderLink>
      <HeaderLink href="/stats">Stats</HeaderLink>
      <HeaderLink href="/articles">Articles</HeaderLink>
      <HeaderLink href="/watch">Watch</HeaderLink>
      <HeaderLink href="/play">Play</HeaderLink>
      <HeaderLink href="/track">Track</HeaderLink>
      <HeaderLink href="/team">Team</HeaderLink>
    </div>
  );
}
