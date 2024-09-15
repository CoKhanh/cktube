import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import Notifications from "./Notifications";
import { LogOut, Youtube } from "lucide-react";
import Link from "next/link";

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

  const handleClickLogOut = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  useEffect(() => {
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
      <div className="flex items-center gap-2">
        <Youtube className="text-red-500" />
        <p className="text-black font-extrabold text-2xl">CKTube</p>
      </div>
      <div className={cn("flex gap-4 pt-2", loggedin && "hidden")}>
        <Button onClick={handleClickLogin}>Login</Button>
        <Button onClick={handleClickRetristration}>Registration</Button>
      </div>
      <div className={cn("hidden gap-4 items-center", loggedin && "flex")}>
        <p className="text-sm">Welcome {username}</p>
        <Link href={"/liked"} className="text-sm">Liked Videos</Link>
        <Notifications />
        <Button onClick={handleClickLogOut} className="hidden md:block">Log out</Button>
        <LogOut onClick={handleClickLogOut} className="block md:hidden text-black" />
      </div>
    </header>
  );
};

export default Header;
