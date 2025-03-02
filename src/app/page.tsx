'use client';
import Auth from "@/components/Auth/Auth";
import toast, { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Home() {
  return <Auth></Auth>;
}
