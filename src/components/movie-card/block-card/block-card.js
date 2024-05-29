import { Component } from 'react';

import './block-card.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Image, Typography, Rate } from 'antd';
import Loader from '../../loader';
const { Title, Paragraph } = Typography;

export default class BlockCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      rating: 0,
      genreMovie: null,
    };
  }

  handleRatingChange = (newRating) => {
    this.setState({ rating : newRating });
  };

  handleImageLoad = () => {
    this.setState({ isLoading: false });
  };

  componentDidUpdate(prevProps) {
    const { genreMovie } = this.props;
    const prevGenreMovie = prevProps.genreMovie;
  
    if (genreMovie !== prevGenreMovie) {
      this.setState({ genreMovie });
    }
  }


  render() {
    const { title, overview, posterPath, formattedDate, placeholderImage, filmId, ratingMovie, genreMovie } = this.props;
    const { isLoading, rating } = this.state;
    console.log("rating:", rating, "id:", filmId)
    let genreMovieArr=[]
    if (genreMovie) {
      

      genreMovieArr = genreMovie.map((item) => {
        return (
          <div className="ganreItem">{item}</div>
        )
      }) 
      console.log('genreMovie:', genreMovie)
    }
    
    let borderColor;

    if (ratingMovie >= 0 && ratingMovie <= 3) {
      borderColor ='#E90000'
    } else if (ratingMovie > 3 && ratingMovie <= 5) {
      borderColor =' #E97E00'
    } else if (ratingMovie > 5 && ratingMovie <= 7) {
      borderColor = '#E9D100'
    } else {
      borderColor = '#66E900'
    }

    // const genreMovieArr = genreMovie.map((item) => {
    //   return (
    //     <div className='itemGanre'>item</div>
    //   )
    // })

    return (
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
            <div className='title-wrapper'>
              <Title>{title}</Title>
              <div className ="film-rate" style={{ border: `2px solid ${borderColor}` }}>
                <span className="span_rate">{ratingMovie.toFixed(1)}</span>
              </div>
            </div>
            <Paragraph className="date-p">{formattedDate}</Paragraph>
            <div className = "movieGanre">
                {genreMovieArr}

            </div>

            <div className="wpapper-description">
              <p className="description-p">{overview}</p>
            </div>
          </div>
          <Rate className="rating" count={10} allowHalf defaultValue={0} value={rating} onChange={this.handleRatingChange} />
        </div>
        
      </>
    );
  }
}
