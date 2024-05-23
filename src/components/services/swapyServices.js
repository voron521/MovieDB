import { Component } from 'react';
import './swapy-services.css';
// import { formatDistanceToNow } from 'date-fns';

// import Header from '../Header';
// import TaskList from '../TaskList';
// import Footer from '../Footer';

export default class SwapyServices extends Component {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1';
  _apiBaseImage = 'https://image.tmdb.org/t/p/w500';

  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmQ1YmZkMzM0MmMyY2FmNGQyZDViOTVjYzk3MTE4MCIsInN1YiI6IjY2NGQ4OTNhNWM0N2IyYjQ4YTE4ODk0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ORrs7PoSHi2hVcSC8o2sy-sYxCE-ML-OXD8tAkPqpqM',
    },
  };

  async getFetch(url) {
    const res = await fetch(url, this.options);
    if (!res.ok) {
      throw new Error(`запрос не получился по url:${url} он завершился со статусом: ${res.status}`);
    }
    return res.json();
  }

  async getMovies() {
    const res = await this.getFetch(this._apiBase);
    return res;
  }

  getPictureMoviesUrl(url) {
    const res = `${this._apiBaseImage}${url}`;
    return res;
  }
}
