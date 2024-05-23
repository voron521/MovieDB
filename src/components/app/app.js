import { Component } from 'react';

import './app.css';

import SwapyServices from '../services';
import MovieCard from '../movie-card';

export default class App extends Component {
  swapiService = new SwapyServices();

  constructor() {
    super();
    this.state = {
      movies: [],
    };
  }

  async componentDidMount() {
    const movies = await this.swapiService.getMovies();
    this.setState({ movies: movies.results });
  }

  makeCardArr() {
    const { movies } = this.state;
    console.log(movies)
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
    const dataCards = this.makeCardArr();
    const mivesArr = dataCards.map((movie) => {
      const fullImagePath = this.swapiService.getPictureMoviesUrl(movie.posterPath);
      return (
        <MovieCard
          key={movie.id}
          title={movie.title}
          overview={movie.overview}
          posterPath={fullImagePath}
          releaseDate={movie.releaseDate}
          backdropPath={movie.backdropPath}
        />
      );
    });

    return <section className="main-section">{mivesArr}</section>;
  }
}
