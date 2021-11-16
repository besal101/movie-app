import React, { useState, useEffect, useCallback } from 'react';
import './MovieGrid.scss';

import axios from 'axios';
import baseUrl from '../../api/config';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';

import Input from '../input/Input';

import { useHistory, useParams } from 'react-router';

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  const loadMore = async () => {
    const params = `list_movies.json?genre=${props.category}&sort_by=${
      props.sort_by
    }&page=${page + 1}`;
    try {
      const response = await axios.get(baseUrl + params);
      setItems([...items, ...response.data.data.movies]);
      setPage(page + 1);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getList = async () => {
      if (keyword === undefined) {
        const params = `list_movies.json?genre=${props.category}&sort_by=${props.sort_by}&page=${page}`;
        try {
          const response = await axios.get(baseUrl + params);
          setItems(response.data.data.movies);
          setTotalPage(response.data.data.movie_count);
        } catch (error) {
          console.error(error);
        }
      } else {
        const params = `list_movies.json?query_term=${keyword}`;
        try {
          const response = await axios.get(baseUrl + params);
          setItems(response.data.data.movies);
          setTotalPage(response.data.data.movie_count);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getList();
  }, [props.category, keyword, page, props.sort_by]);
  return (
    <>
      <div className="section mb-3">
        <MovieSearch keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`movie/search/${keyword}`);
    }
  }, [keyword, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClick={goToSearch}>
        Search
      </Button>
    </div>
  );
};
export default MovieGrid;
