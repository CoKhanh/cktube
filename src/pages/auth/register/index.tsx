"use client"

import React, { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { AuthData } from "../../../../types";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm<AuthData>();
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    const { username, password } = formData;

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const status = response.status;
    const data = await response.json();

    if (status === 200) {
      reset();
      toast({
        title: data.message,
        description: "Redirect to Videos space",
        duration: 1500
      })
      // sign in
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      const status = response.status;
      const { token } = await response.json();

      if (status === 200) {
        localStorage.setItem("token", token)
        setTimeout(() => {
          router.push("/");
        }, 1000)
      } else {
        toast({
          title: "Something wrong",
          description: data.message,
        })
      }

    } else {
      toast({
        title: "Something wrong",
        description: data.message,
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
      <form className="w-full md:w-1/6 px-4 md:px-0 flex flex-col gap-4 text-center" onSubmit={onSubmit}>
        <p className="text-red-600 text-3xl font-bold">Welcome to RemiTube</p>
        <Input placeholder="username" required {...register("username")} />
        <Input placeholder="password" type="password" required {...register("password")} />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}

export default RegisterPage;
