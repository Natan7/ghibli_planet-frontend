import React from "react";
import Header from "../components/Header";
import MovieList from "../components/MovieList";
import Footer from "../components/Footer";

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