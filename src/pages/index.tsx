import ClickMe from "@/components/ClickMe";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [task, setTask] = useState([]);

  const tasks = async () => {
    const response = await fetch("/api/tasks");
    const data = await response.json(); // Parse the response as JSON
    setTask(data.tasks);
  }

  useEffect(() => {
    const getTasks = async () => {
      await tasks();
    }
    getTasks();
  }, [])

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {task?.map(({ _id, text }) => (
        <div key={_id}>{text}</div>
      ))}
      <ClickMe />
    </main>
  );
}
