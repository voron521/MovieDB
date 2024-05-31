import { Component } from 'react';
import './block-card.css';
import { Image, Typography, Rate } from 'antd';

import Loader from '../../loader';
import { GenreMovieConsumer } from '../../genreMovieContext';
import SwapyServices from '../../services';

const { Title, Paragraph } = Typography;
export default class BlockCards extends Component {
  // eslint-disable-next-line react/no-unused-class-component-methods
  static keyGenerate = 0;

  static makeDivGenre = (genreMovie, filmId) => {
    if (genreMovie[filmId] !== undefined) {
      // eslint-disable-next-line no-return-assign
      return genreMovie[filmId].map((item) => (
        <div key={(BlockCards.keyGenerate += 1)} className="ganreItem">
          {item}
        </div>
      ));
    }
    return null;
  };

  SwapyServices = new SwapyServices();

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rating: 0,
      tab: '1',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { filmId, tabChange } = this.props;
    const { rating, tab } = this.state;

    const prevRating = prevState.rating;
    if (rating !== prevRating) {
      this.SwapyServices.sendFilmRate(filmId, rating);
    }
    const prevTab = tab;
    if (tabChange !== prevTab) {
      this.setState({ tab: tabChange });
    }
  }

  handleImageLoad = () => {
    this.setState({ isLoading: false });
  };

  handleRatingChange = (newRating) => {
    this.setState({ rating: newRating });
  };

  render() {
    const { title, overview, posterPath, formattedDate, placeholderImage, filmId, ratingMovie } = this.props;
    const { isLoading, tab } = this.state;
    let borderColor;

    if (ratingMovie >= 0 && ratingMovie <= 3) {
      borderColor = '#E90000';
    } else if (ratingMovie > 3 && ratingMovie <= 5) {
      borderColor = ' #E97E00';
    } else if (ratingMovie > 5 && ratingMovie <= 7) {
      borderColor = '#E9D100';
    } else {
      borderColor = '#66E900';
    }

    return (
      <GenreMovieConsumer>
        {(genresMovies) => (
          <>
            <div className="img-wrapper">
              {isLoading ? <Loader className="loader-img" /> : null}

              <Image
                className={`main-img ${isLoading ? 'ant-image-hidden' : ''}`}
                height={281}
                width={183}
                src={posterPath}
                fallback={placeholderImage}
                alt="обложка фильма"
                onLoad={this.handleImageLoad}
                preview={false}
              />
            </div>
            <div className="info-wrapper">
              <div className="header-info">
                <div className="title-wrapper">
                  <Title>{title}</Title>
                  <div className="film-rate" style={{ border: `2px solid ${borderColor}` }}>
                    <span className="span_rate">{ratingMovie.toFixed(1)}</span>
                  </div>
                </div>
                <Paragraph className="date-p">{formattedDate}</Paragraph>
                <div className="movieGanre">{BlockCards.makeDivGenre(genresMovies, filmId)}</div>

                <div className="wpapper-description">
                  <p className="description-p">{overview}</p>
                </div>
              </div>
              <Rate
                className="rating"
                count={10}
                allowHalf
                defaultValue={0}
                value={tab === '1' ? 0 : ratingMovie}
                onChange={this.handleRatingChange}
              />
            </div>
          </>
        )}
      </GenreMovieConsumer>
    );
  }
}
