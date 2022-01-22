import type { NextPage } from "next";
import Link from "next/link";

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <div>
        <Link href={`/`}>Home</Link>
        <Link href={`/superheroes`}>Superheroes</Link>
        <Link href={`/rq-superheroes`}>RQ Superheroes</Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
