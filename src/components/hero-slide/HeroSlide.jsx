import React, { useEffect, useRef, useState } from 'react';
import baseUrl from '../../api/config';
import axios from 'axios';

import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import './hero-slide.scss';
import { useHistory } from 'react-router';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

const slider = [
  {
    image:
      'https://thebutlercollegian.com/wp-content/uploads/2019/03/netflix-image.jpg',
  },
];

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);
  const [movieItems, setMovieItems] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const params = 'list_movies.json?genre=action&minimum_rating=7';
      try {
        const response = await axios.get(baseUrl + params);
        setMovieItems(response.data.data.movies.slice(0, 6));
      } catch (error) {
        console.error(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 8000 }}
      >
        {movieItems.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? 'active' : ''}`}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItems.map((item, i) => (
        <TrailerModal key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  let history = useHistory();
  const item = props.item;
  const background = slider[0].image;

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);
    const videos = item.yt_trailer_code;
    if (videos.length > 0) {
      const videoSRC = 'https://www.youtube.com/embed/' + videos;
      modal
        .querySelector('.modal__content > iframe')
        .setAttribute('src', videoSRC);
    } else {
      modal.querySelector('.modal__content').innerHTML = 'No trailer';
    }
    modal.classList.toggle('active');
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h2 className="title">{item.title_long}</h2>
          <div className="overview">{item.summary}</div>
          <div className="btns">
            <Button onClick={() => history.push('/movie/' + item.id)}>
              Watch Movie
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <img src={item.large_cover_image} alt="" />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);
  const onClose = () => iframeRef.current.setAttribute('src', '');
  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
