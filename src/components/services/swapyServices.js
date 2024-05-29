import { Component } from 'react';
import './swapy-services.css';
// import { formatDistanceToNow } from 'date-fns';

// import Header from '../Header';
// import TaskList from '../TaskList';
// import Footer from '../Footer';

export default class SwapyServices extends Component {
  _apiGuestSession = 'https://api.themoviedb.org/3/authentication/guest_session/new';
  _apiBase = 'https://api.themoviedb.org/3/search/movie?query=';
  _apiOptions = '&include_adult=false&language=en-US&page='
  _apiBaseImage = 'https://image.tmdb.org/t/p/w500';
  _apiMovieDetails = 'https://api.themoviedb.org/3/movie/'

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmQ1YmZkMzM0MmMyY2FmNGQyZDViOTVjYzk3MTE4MCIsInN1YiI6IjY2NGQ4OTNhNWM0N2IyYjQ4YTE4ODk0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ORrs7PoSHi2hVcSC8o2sy-sYxCE-ML-OXD8tAkPqpqM',
    },
  };

  async getFetch(url, option = '', serachName = '') {
    let completeUrl = `${url}${serachName}${option}`
    console.log('utr внутри swapy getFetch:', completeUrl);
    const res = await fetch(completeUrl, this.options);
    if (!res.ok) {
      throw new Error(`запрос не получился по url:${completeUrl} он завершился со статусом: ${res.status}`);
    }
    return res.json();
  }

  async getMovies(serachName, page) {
    let optionsWithPage = `${this._apiOptions}${page}`
    
    const res = await this.getFetch(this._apiBase, optionsWithPage, serachName);
    return res;
  }

  async guestSession() {
    const res = await this.getFetch(this._apiGuestSession);
    return res;

  }

  async getGenreMovie(idFilm) {
    const res = await this.getFetch(this._apiMovieDetails, idFilm);
    const resGenres = res.genres.map((movie) => {
      return movie.name
    })
    return resGenres;
  }

  getPictureMoviesUrl(url) {
    const res = `${this._apiBaseImage}${url}`;

    return res;
  }

}

