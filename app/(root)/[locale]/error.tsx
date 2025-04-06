"use client";
import dynamic from "next/dynamic";

const NotFound = dynamic(() => import("@components/NotFound"));

export default function ErrorPage() {
  return <NotFound type="error" />;
}
