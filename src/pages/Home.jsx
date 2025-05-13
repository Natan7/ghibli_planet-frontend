import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieList from "../components/MovieList";

import '../styles/home.css';

const Home = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="content">
        <MovieList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;