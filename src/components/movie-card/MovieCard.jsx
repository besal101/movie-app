import React from 'react';
import './MovieCard.scss';
import { BiPlay } from 'react-icons/bi';

import { Link } from 'react-router-dom';

import Button from '../button/Button';

const MovieCard = (props) => {
  const item = props.item;
  const link = `/movie/${item.id}`;
  const bg = item.large_cover_image;
  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <BiPlay />
        </Button>
      </div>
      <h3>{item.title_long}</h3>
    </Link>
  );
};

export default MovieCard;
