import { Menu, Transition } from '@headlessui/react';
import { Bars2Icon } from '@heroicons/react/20/solid';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AnchorHTMLAttributes,
  forwardRef,
  Fragment,
  PropsWithChildren,
} from 'react';

const LINKS = [
  { name: 'Philosophy', href: '/philosophy' },
  { name: 'Decks', href: '/decks' },
  { name: 'Stats', href: '/stats' },
  { name: 'Articles', href: '/articles' },
  { name: 'Watch', href: '/watch' },
  { name: 'Play', href: '/play' },
  { name: 'Track', href: '/track' },
  { name: 'Team', href: '/team' },
];

const MobileNavigationMenuItemLink = forwardRef<
  HTMLAnchorElement,
  PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>
>(function MobileNavigationMenuItemLink(props, ref) {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  );
});

function MobileNavigationMenuItem({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  return (
    <Menu.Item as={Fragment}>
      {({ active }) => (
        <MobileNavigationMenuItemLink href={href}>
          <a
            className={cn(
              'group flex w-full items-center rounded-md p-2 text-lg font-bold',
              active ? 'bg-violet-500 text-white' : 'text-gray-900'
            )}
          >
            {children}
          </a>
        </MobileNavigationMenuItemLink>
      )}
    </Menu.Item>
  );
}

function MobileNavigationMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="md:hidden inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        <Bars2Icon
          className="h-8 w-8 text-violet-200 hover:text-violet-100"
          aria-hidden="true"
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="md:hidden absolute right-0 mt-2 p-2 w-screen max-w-xs md:max-w-md origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {LINKS.map(({ name, href }) => (
            <MobileNavigationMenuItem key={href} href={href}>
              {name}
            </MobileNavigationMenuItem>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function DesktopHeaderLink({
  href,
  children,
}: PropsWithChildren<{ href: string }>) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={cn(
          'hidden md:inline-block text-gray-300 transition-colors hover:text-gray-100',
          {
            underline: router.pathname === href,
          }
        )}
      >
        {children}
      </a>
    </Link>
  );
}

export function PageHeader() {
  return (
    <nav className="flex items-center space-x-4 p-6">
      <Link href="/">
        <a className="flex-1 text-3xl font-bold">What is cEDH?</a>
      </Link>

      <MobileNavigationMenu />
      {LINKS.map(({ name, href }) => (
        <DesktopHeaderLink key={href} href={href}>
          {name}
        </DesktopHeaderLink>
      ))}
    </nav>
  );
}
