import React from "react";
import { ReactNode } from "react";
import Header from "./Header";

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      {children}
    </main>
  );
};

export default Layout;
