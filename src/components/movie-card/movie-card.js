import './movie-card.css';
import { format } from 'date-fns';

import Loader from '../loader';

import BlockCards from './block-card';

function MovieCard(props) {
  const { movieId, title, overview, posterPath, releaseDate, loadStatus, ratingMovie, genreMovie, tabChange } = props;

  const placeholderImage = 'https://via.placeholder.com/183x281.png?text=No+Image';
  let formattedDate = '';
  if (releaseDate && typeof releaseDate === 'string') {
    const date = new Date(releaseDate);
    if (!isNaN(date)) {
      formattedDate = format(date, 'MMMM d, yyyy');
    }
  }
  return (
    <article className="main-articl" key={movieId}>
      {loadStatus ? (
        <Loader />
      ) : (
        <BlockCards
          title={title}
          overview={overview}
          posterPath={posterPath}
          formattedDate={formattedDate}
          placeholderImage={placeholderImage}
          filmId={movieId}
          ratingMovie={ratingMovie}
          genreMovie={genreMovie}
          tabChange={tabChange}
        />
      )}
    </article>
  );
}

export default MovieCard;
