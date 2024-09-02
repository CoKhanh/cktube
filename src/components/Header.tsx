import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

const Header = () => {
  const router = useRouter();
  const [loggedin, setLoggedIn] = useState<boolean>(false);

  const handleClickRetristration = () => {
    router.push("/auth/register");
  }

  const handleClickLogin = () => {
    router.push("/auth/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
    }
  })

  return (
    <header
      className="fixed top-0 w-full h-fit px-4 md:px-8 py-4 md:py-5 bg-white text-xl flex justify-between gap-2 items-center shadow"
    >
      <p className="text-red-600 font-extrabold text-2xl">RemiTube</p>
      <div className={cn("flex gap-4 pt-2", loggedin && "hidden")}>
        <Button onClick={handleClickLogin}>Login</Button>
        <Button onClick={handleClickRetristration}>Registration</Button>
      </div>
    </header>
  );
};

export default Header;
