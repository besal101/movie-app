import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';

import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated</h2>
            <Link to="/filter/rating">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={'rating'} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Most Downloaded</h2>
            <Link to="/filter/download_count">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={'download_count'} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Recently Uploaded</h2>
            <Link to="/filter/year">
              <OutlineButton className="small">View More</OutlineButton>
            </Link>
          </div>
          <MovieList category={'year'} />
        </div>
      </div>
    </>
  );
};

export default Home;
