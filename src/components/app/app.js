import { Component } from 'react';
import './app.css';
import Loader from '../loader';
import SwapyServices from '../services';
import MovieCard from '../movie-card';
import Onerror from '../Onerror';
import Isonline from '../Isonline';
import Header from '../header';
import { Pagination } from 'antd';

export default class App extends Component {
  swapiService = new SwapyServices();

  constructor() {
    super();
    this.state = {
      movies: [],
      loadMovies: true,
      error: false,
      searchName: null,
      currentPage: 1,
      totalResults: 0,
    };
  }

  componentDidMount() {
    this.loadMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName || prevState.currentPage !== this.state.currentPage) {
      this.loadMovies(this.state.searchName, this.state.currentPage);
    }
  }

  TakeSeachName = (name) => {
    this.setState({ searchName: name, currentPage: 1 });
  }

  loadErr() {
    this.setState({ error: true });
  }

  async loadMovies(name, page = 1) {
    if (!name) {
      return;
    }
    try {
      const movies = await this.swapiService.getMovies(name, page);
      this.setState({ 
        loadMovies: false, 
        movies: movies.results, 
        totalResults: movies.total_results 
      });
    } catch (err) {
      this.loadErr();
    }
  }

  makeCardArr() {
    const { movies } = this.state;
    const dataCards = movies.map((mov) => ({
      id: mov.id,
      title: mov.title,
      overview: mov.overview,
      posterPath: mov.poster_path,
      releaseDate: mov.release_date,
    }));
    return dataCards;
  }

  onChangePage = (page) => {
    this.setState({ currentPage: page });
  }

  render() {
    const { loadMovies, error, currentPage, totalResults } = this.state;
    const dataCards = this.makeCardArr();
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
    if (this.state.searchName === null) {
      mivesArr = <div className='info-search-section'>Для отображения фильмов введите название фильма в строку поиска</div>
    }

    if (!(this.state.loadMovies) && this.state.movies.length === 0) {
      mivesArr = <div className='info-search-section'>По вашему запросу фильмов не найдено</div>
    }

    return (
      <div className='mainWpapper'>
        <Header TakeSeachName={this.TakeSeachName} />
        <section className={classSection}>
        
          <div className='movies-wrapper'>
            {mivesArr}
          </div>
          
          <Isonline className="isonlineApp" />
        </section>
        <Pagination 
            current={currentPage} 
            onChange={this.onChangePage} 
            total={totalResults} 
          />
        
      </div>
      
    );
  }
}