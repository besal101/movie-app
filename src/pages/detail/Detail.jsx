import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import baseUrl from '../../api/config';
import bg from '../../assets/footer-bg.jpg';
import './Detail.scss';
import Button from '../../components/button/Button';

const Detail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const params = `movie_details.json?movie_id=${id}`;
      try {
        const response = await axios.get(baseUrl + params);
        setItem(response.data.data.movie);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    getDetail();
  }, [id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{ backgroundImage: `url(${bg})` }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${item.large_cover_image})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <div className="title">{item.title_long}</div>
              <div className="genres">
                {item.genres.map((genre, i) => (
                  <span key={i} className="genres__item">
                    {genre}
                  </span>
                ))}
              </div>

              <p className="overview">{item.description_intro}</p>
              <div className="cast">
                <div className="footer__content__menus mb-3">
                  <div className="footer__content__menu">
                    <a href={`https://www.imdb.com/title/${item.imdb_code}`}>
                      IMDB: {item.rating}
                    </a>
                    <span to="/">RunTime: {item.runtime} min</span>
                    <span to="/">Watched: {item.download_count} times</span>
                  </div>
                </div>
                <div className="section__header">
                  <h3>Choose the quality you want to watch :</h3>
                  <br />
                  {item.torrents &&
                    item.torrents.map((torrent, i) => (
                      <Watch props={torrent} key={i} title={item.title} />
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <div className="video">
                <div className="video__title">
                  <h3>
                    [ Please wait atleast two minute. Torrent render depends
                    upon seeding & Leeching so may take a while. ]
                  </h3>
                </div>
                <div className="movie_here"></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Watch = ({ props, title }) => {
  var torrentId = `magnet:?xt=urn:btih:${props.hash}&dn=${title}&tr=udp://explodie.org:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.coppersurfer.tk:6969&tr=udp://tracker.empire-js.us:1337&tr=udp://tracker.leechers-paradise.org:6969&tr=udp://tracker.opentrackr.org:1337&tr=wss://tracker.btorrent.xyz&tr=wss://tracker.fastcast.nz&tr=wss://tracker.openwebtorrent.com&ws=https://webtorrent.io/torrents/&xs=${props.url}`;
  const gettorrent = () => {
    console.log(torrentId);
    var WebTorrent = require('webtorrent');
    var client = new WebTorrent();

    client.on('error', (err) => {
      console.log('[+] Webtorrent error: ' + err.message);
    });

    client.add(torrentId, (torrent) => {
      const torrentFiles = torrent.files;

      torrentFiles.map((file, i) => {
        const abc =
          file.name.substring(
            file.name.lastIndexOf('.') + 1,
            file.name.length
          ) || file.name;
        if (abc === 'mp4') {
          file.appendTo('.movie_here');
        }
      });
    });
  };

  return (
    <>
      <Button className="small" onClick={gettorrent}>
        {props.quality + ' ' + props.type}
      </Button>
    </>
  );
};

export default Detail;
