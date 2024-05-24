import { Component } from 'react';

import './app.css';
import Loader from '../loader';
import SwapyServices from '../services';
import MovieCard from '../movie-card';
import Onerror from '../Onerror';
import Isonline from '../Isonline';

export default class App extends Component {
  swapiService = new SwapyServices();

  constructor() {
    super();
    this.state = {
      movies: [],
      loadMovies: true,
      error: false,
    };
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadErr() {
    this.setState({ error: true });
  }

  async loadMovies() {
    try {
      const movies = await this.swapiService.getMovies();
      setTimeout(() => {
        this.setState({ loadMovies: false, movies: movies.results }, () => {
          this.makeCardArr();
        });
      }, 1000);
    } catch (err) {
      this.loadErr();
    }
  }

  makeCardArr() {
    const { movies } = this.state;
    console.log(movies);
    const dataCards = movies.map((mov) => ({
      id: mov.id,
      title: mov.title,
      overview: mov.overview,
      posterPath: mov.poster_path,
      releaseDate: mov.release_date,
    }));
    return dataCards;
  }

  render() {
    console.log('местный иснолайн', Isonline.state);
    const dataCards = this.makeCardArr();
    const { loadMovies, error } = this.state;
    let classSection = 'main-section';
    let mivesArr;

    function completeRend(loadMovies, dataCards, swipe) {
      mivesArr = dataCards.map((movie) => {
        const fullImagePath = swipe(movie.posterPath);
        return (
          <MovieCard
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={fullImagePath}
            releaseDate={movie.releaseDate}
            backdropPath={movie.backdropPath}
            loadStatus={loadMovies}
          />
        );
      });
      return mivesArr;
    }
    loadMovies
      ? ((mivesArr = <Loader />), (classSection = 'section-loader'))
      : ((mivesArr = completeRend(
          loadMovies,
          dataCards,
          this.swapiService.getPictureMoviesUrl.bind(this.swapiService)
        )),
        (classSection = 'main-section'));
    if (error) {
      mivesArr = <Onerror />;
    }

    return (
      <section className={classSection}>
        {mivesArr}
        {<Isonline className="isonlineApp" />}
      </section>
    );
  }
}
