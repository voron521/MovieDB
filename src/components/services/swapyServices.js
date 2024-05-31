import { Component } from 'react';
import './swapy-services.css';

export default class SwapyServices extends Component {
  apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new';

  apiBase = 'https://api.themoviedb.org/3/search/movie?query=';

  apiOptions = '&include_adult=false&language=en-US&page=';

  apiBaseImage = 'https://image.tmdb.org/t/p/w500';

  apiMovieDetails = 'https://api.themoviedb.org/3/movie/';

  apiSendRateBase = 'https://api.themoviedb.org/3/movie/';

  apiSendRateEnd = '/rating';

  // _apiGetRateBase = 'https://api.themoviedb.org/4/guest_session/'
  // _apiGetRateEnd = '/rated/movies?api_key=a6d5bfd3342c2caf4d2d5b95cc971180'
  apiGetRatedVersion4 = 'https://api.themoviedb.org/4/account/664d893a5c47b2b48a188945/movie/rated';

  // _apiBaseGetMovieMyReit = '`https://api.themoviedb.org/3/movie/${movieId}/account_states?api_key=YOUR_API_KEY&session_id=${sessionId}`'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmQ1YmZkMzM0MmMyY2FmNGQyZDViOTVjYzk3MTE4MCIsInN1YiI6IjY2NGQ4OTNhNWM0N2IyYjQ4YTE4ODk0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ORrs7PoSHi2hVcSC8o2sy-sYxCE-ML-OXD8tAkPqpqM',
    },
  };

  // optionsGetRate = {
  //   method: 'GET',
  //   headers: {
  //     accept: 'application/json',
  //   },
  // };

  // const optionsRate = {
  //   method: 'POST',
  //   headers: {
  //     accept: 'application/json',
  //     'Content-Type': 'application/json;charset=utf-8',
  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmQ1YmZkMzM0MmMyY2FmNGQyZDViOTVjYzk3MTE4MCIsInN1YiI6IjY2NGQ4OTNhNWM0N2IyYjQ4YTE4ODk0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ORrs7PoSHi2hVcSC8o2sy-sYxCE-ML-OXD8tAkPqpqM'
  //   },
  //   body: JSON.stringify({
  //     value: null
  //   })
  // };

  async getFetch(url, option = '', serachName = '') {
    const completeUrl = `${url}${serachName}${option}`;
    const res = await fetch(completeUrl, this.options);
    if (!res.ok) {
      throw new Error(`запрос не получился по url:${completeUrl} он завершился со статусом: ${res.status}`);
    }
    return res.json();
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  async getMovies(serachName, page) {
    const optionsWithPage = `${this.apiOptions}${page}`;

    const res = await this.getFetch(this.apiBase, optionsWithPage, serachName);
    return res;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  async getGenreMovie(idFilm) {
    const res = await this.getFetch(this.apiMovieDetails, idFilm);
    const resGenres = res.genres.map((movie) => movie.name);
    return resGenres;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  async getFilmMyRate(guestSessionId) {
    // const res = fetch(`${this._apiGetRateBase}${guestSessionId}${this._apiGetRateEnd}`, this.optionsGetRate)
    const res = await fetch(this.apiGetRatedVersion4, this.options);

    if (!res.ok) {
      throw new Error(
        `запрос рейтингов фильма не получился по url:${this.apiGetRatedVersion4} он завершился со статусом: ${res.status}`
      );
    }
    const data = await res.json();

    return data;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  getPictureMoviesUrl(url) {
    const res = `${this.apiBaseImage}${url}`;

    return res;
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  async sendFilmRate(id, rateValue) {
    const optionsRate = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmQ1YmZkMzM0MmMyY2FmNGQyZDViOTVjYzk3MTE4MCIsInN1YiI6IjY2NGQ4OTNhNWM0N2IyYjQ4YTE4ODk0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ORrs7PoSHi2hVcSC8o2sy-sYxCE-ML-OXD8tAkPqpqM',
      },
      body: JSON.stringify({
        value: rateValue,
      }),
    };
    await fetch(`${this.apiSendRateBase}${id}${this.apiSendRateEnd}`, optionsRate)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Ошибка при отправке рейтинга');
      })
      .catch((error) => {
        throw error;
      });
  }

  // eslint-disable-next-line react/no-unused-class-component-methods
  async guestSession() {
    const res = await this.getFetch(this.apiGuestSession);
    return res;
  }
}
