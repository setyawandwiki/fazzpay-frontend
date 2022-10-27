import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
  };
  return (
    <div>
      <Link href="/home">Home</Link> |{" "}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
