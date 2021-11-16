import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

import { useHistory } from 'react-router';
import logo from '../../assets/bmovie.png';

import Input from '../input/Input';
import Button from '../button/Button';

const headerNav = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Browse',
    path: '/filter/year',
  },
  {
    title: 'Recent',
    path: '/action',
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const history = useHistory();
  const active = headerNav.findIndex((e) => e.path === pathname);

  const [keyword, setKeyword] = useState('');

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

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add('shrink');
      } else {
        headerRef.current.classList.remove('shrink');
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="BMovies" />
          <Link to="/">bMovies</Link>
        </div>
        <div className="header__search movie-search">
          <Input
            type="text"
            placeholder="Enter Movie you want to search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="small" onClick={goToSearch}>
            Search
          </Button>
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? 'active' : ''}`}>
              <Link to={e.path}>{e.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
