import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";

const Header = () => {
  const router = useRouter();
  const [loggedin, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const handleClickRetristration = () => {
    router.push("/auth/register");
  }

  const handleClickLogin = () => {
    router.push("/auth/login");
  }

  useEffect(() => {
    console.log("ting");
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);

      const verifiedDecoded = jwtDecode(token) as JwtPayload & {
        username: string
      };
      const { username: publisher } = verifiedDecoded;
      setUsername(publisher);
    }
  })

  return (
    <header
      className="fixed top-0 w-full h-fit px-4 md:px-8 py-4 md:py-5 bg-white text-xl flex justify-between gap-2 items-center shadow z-10"
    >
      <p className="text-red-500 font-extrabold text-2xl">RemiTube</p>
      <div className={cn("flex gap-4 pt-2", loggedin && "hidden")}>
        <Button onClick={handleClickLogin}>Login</Button>
        <Button onClick={handleClickRetristration}>Registration</Button>
      </div>
      <p className={cn("hidden text-sm", loggedin && "block")}>Welcome {username}</p>
    </header>
  );
};

export default Header;
