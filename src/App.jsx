import React from "react";
import Router from "./Router";
import "./assets/reset.css";
import "./assets/style.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Modal } from "./components/UI";

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
      <Footer />
      <Modal />
    </>
  );
};

export default App;
