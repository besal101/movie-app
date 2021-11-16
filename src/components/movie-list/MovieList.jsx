import React, { useState, useEffect } from 'react';
import './MovieList.scss';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
// import { Link } from 'react-router-dom';
// import Button from '../button/Button';
import baseUrl from '../../api/config';
import MovieCard from '../movie-card/MovieCard';

const MovieList = ({ category }) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const getList = async () => {
      const params = `list_movies.json?sort_by=${category}`;
      try {
        const response = await axios.get(baseUrl + params);
        setItems(response.data.data.movies);
      } catch (error) {
        console.error(error);
      }
    };
    getList();
  }, [category]);
  return (
    <div className="movie-list">
      <Swiper grabCursor={true} spaceBetween={20} slidesPerView={'auto'}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
};

export default MovieList;
