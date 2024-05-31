import { Component } from 'react';
import './app.css';
import { Pagination } from 'antd';

import Loader from '../loader';
import SwapyServices from '../services';
import MovieCard from '../movie-card';
import Onerror from '../Onerror';
import Isonline from '../Isonline';
import Header from '../header';
import { GenreMovieProvider } from '../genreMovieContext';

export default class App extends Component {
  swapiService = new SwapyServices();

  constructor() {
    super();
    this.state = {
      movies: {},
      moviesMyRate: {},
      loadMovies: true,
      error: false,
      searchName: null,
      currentPage: 1,
      totalResults: 0,
      genresMovies: {},
      guestSessionid: null,
      tabChange: '1',
    };
    this.getGanreMovie = this.getGanreMovie.bind(this);
  }

  componentDidMount() {
    this.loadMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchName, currentPage, tabChange } = this.state;
    if ((prevState.searchName !== searchName || prevState.currentPage !== currentPage) && tabChange !== '2') {
      this.loadMovies(searchName, currentPage);
    }
    if (prevState.tabChange !== tabChange && tabChange === '2') {
      this.loadMovies(searchName, currentPage, true);
    }
    if (prevState.tabChange !== tabChange && tabChange === '1') {
      this.loadMovies(searchName, currentPage, false);
    }
  }

  async getGanreMovie(id) {
    const { tabChange } = this.state;
    let itemName;
    if (tabChange === '1') {
      itemName = 'movies';
    } else {
      itemName = 'moviesMyRate';
    }
    try {
      const genre = await this.swapiService.getGenreMovie(id);
      this.setState((prevState) => {
        const newMovies = { ...prevState[itemName] };
        if (newMovies[id]) {
          newMovies[id].genreMovie = genre;
        }

        const newGenresMovies = { ...prevState.genresMovies, [id]: genre };

        return { [itemName]: newMovies, genresMovies: newGenresMovies };
      });
    } catch (err) {
      this.setState({ genresMovies: [err] });
    }
  }

  tabCHange = (keyNumber) => {
    this.setState({
      tabChange: keyNumber,
    });
  };

  TakeSeachName = (name) => {
    this.setState({ searchName: name, currentPage: 1 });
  };

  onChangePage = (page) => {
    this.setState({ currentPage: page });
  };

  makeCardArr(myRate = 0) {
    const { movies, moviesMyRate } = this.state;
    let moviesForMakeArr;
    if (!myRate) {
      moviesForMakeArr = movies;
    } else {
      moviesForMakeArr = moviesMyRate;
    }
    const dataCards = [];
    for (const key in moviesForMakeArr) {
      if (Object.prototype.hasOwnProperty.call(moviesForMakeArr, key)) {
        const mov = moviesForMakeArr[key];
        dataCards.push({
          id: mov.id,
          title: mov.title,
          overview: mov.overview,
          posterPath: mov.poster_path,
          releaseDate: mov.release_date,
          ratingMovie: myRate ? mov.account_rating.value : mov.vote_average,
          genreMovie: mov.genreMovie,
        });
      }
    }

    return dataCards;
  }

  async loadMovies(name, page = 1, myRating = 0) {
    let changeItem;

    if (!name && !myRating) {
      return;
    }
    try {
      let movies = [];
      if (!myRating) {
        movies = await this.swapiService.getMovies(name, page);
        changeItem = 'movies';
      } else {
        changeItem = 'moviesMyRate';
        movies = await this.swapiService.getFilmMyRate();
      }

      const movieDict = movies.results.reduce((acc, iter) => {
        this.getGanreMovie(iter.id);
        const newAcc = { ...acc, [iter.id]: iter };
        return newAcc;
      }, {});

      this.swapiService.guestSession().then((res) => {
        this.setState({ guestSessionid: res.guest_session_id });
      });

      this.setState({
        loadMovies: false,
        [changeItem]: movieDict,
        totalResults: movies.total_pages,
      });
    } catch (err) {
      this.loadErr();
    }
  }

  loadErr() {
    this.setState({ error: true });
  }

  completeMovieArr(loadMovies, dataCards, swipe, rateFilmTrue = 0) {
    const { tabChange } = this.state;
    let ratingMovie;
    const mivesArr = dataCards.map((movie) => {
      if (!rateFilmTrue) {
        ratingMovie = movie.ratingMovie;
      } else {
        ratingMovie = movie.account_rating.value;
      }
      const fullImagePath = swipe(movie.posterPath);
      return (
        <MovieCard
          key={movie.id}
          movieId={movie.id}
          title={movie.title}
          overview={movie.overview}
          posterPath={fullImagePath}
          releaseDate={movie.releaseDate}
          backdropPath={movie.backdropPath}
          loadStatus={loadMovies}
          ratingMovie={ratingMovie}
          genreMovie={movie.genreMovie}
          tabChange={tabChange}
        />
      );
    });
    return mivesArr;
  }

  render() {
    const { loadMovies, error, currentPage, totalResults, genresMovies, tabChange, searchName, movies, moviesMyRate } =
      this.state;
    let dataCards = [];
    if (tabChange === '1') {
      dataCards = this.makeCardArr();
    } else {
      dataCards = this.makeCardArr(true);
    }

    let classSection = 'main-section';
    let mivesArr;

    if (loadMovies) {
      mivesArr = <Loader />;
      classSection = 'section-loader';
    } else {
      mivesArr = this.completeMovieArr(
        loadMovies,
        dataCards,
        this.swapiService.getPictureMoviesUrl.bind(this.swapiService)
      );
      classSection = 'main-section';
    }

    if (error) {
      mivesArr = <Onerror />;
    }
    if (searchName === null && tabChange === '1') {
      mivesArr = (
        <div className="info-search-section">Для отображения фильмов введите название фильма в строку поиска</div>
      );
    }

    if (!loadMovies && Object.keys(movies).length === 0 && Object.keys(moviesMyRate).length === 0) {
      mivesArr = <div className="info-search-section">По вашему запросу фильмов не найдено</div>;
    }

    return (
      <GenreMovieProvider value={genresMovies}>
        <div className="mainWpapper">
          <Header TakeSeachName={this.TakeSeachName} tabCHange={this.tabCHange} keyTabCHange={tabChange} />
          <section className={classSection}>
            <div className="movies-wrapper">{mivesArr}</div>

            <Isonline className="isonlineApp" />
          </section>
          <Pagination current={currentPage} onChange={this.onChangePage} total={totalResults} />
        </div>
      </GenreMovieProvider>
    );
  }
}
