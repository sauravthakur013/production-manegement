// src/components/Auth/Auth.tsx
"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

function MyApp({ Component, pageProps }: any) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
