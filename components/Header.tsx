import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive('/')}>
          Home
        </a>
      </Link>

      <style jsx>{`
        .left {
          flex: 1 1 200px;
        }
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = (
    <div className="right">
      <Link href="/shirts">
        <a className="bold" data-active={isActive('/shirts')}>
          Shirts
        </a>
      </Link>
      <Link href="/sweatshirts">
        <a className="bold" data-active={isActive('/sweatshirts')}>
          SweatShirts
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
          margin-right: 20px;
          padding: 5px;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .right a[data-active='true'] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  return (
    <nav>
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          top: 0;
          width: 100%;
          overflow: auto;
          height: auto;
          padding: 2rem;
          align-items: center;
          border-bottom: solid 1px;
        }
      `}</style>
    </nav>
  );
};

export default Header;
