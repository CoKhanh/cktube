"use client"

import React, { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { AuthData } from "../../../../types";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm<AuthData>();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    const { username, password } = formData;

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const status = response.status;
    const { token, message } = await response.json();

    if (status === 200) {
      reset();
      toast({
        title: message,
        description: "Redirect to Videos space",
        duration: 1000
      })

      localStorage.setItem("token", token);

      setTimeout(() => {
        router.push("/");
      }, 1000)
    } else {
      toast({
        title: "Something wrong",
        description: message,
      })
    }
  })

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, [])

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-full px-4 md:px-0 md:w-1/6 flex flex-col gap-4 text-center" onSubmit={onSubmit}>
        <p className="text-red-600 text-3xl font-bold">Welcome to CKTube</p>
        <Input placeholder="username" required {...register("username")} />
        <Input placeholder="password" type="password" required {...register("password")} />
        <Button type="submit">Sign in</Button>
      </form>
    </div>
  )
}

export default LoginPage;
