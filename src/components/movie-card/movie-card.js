import { Component } from 'react';
import './movie-card.css';
import { Image, Typography } from 'antd';
import { format } from 'date-fns';

const { Title, Paragraph } = Typography;

// eslint-disable-next-line react/prefer-stateless-function
export default class MovieCard extends Component {
  render() {
    const { id, title, overview, posterPath, releaseDate } = this.props;
    const placeholderImage = 'https://via.placeholder.com/183x281.png?text=No+Image';
    let formattedDate = '';
    if (releaseDate && typeof releaseDate === 'string') {
      const date = new Date(releaseDate);
      if (!isNaN(date)) {
        formattedDate = format(date, 'MMMM d, yyyy');
      }
    }
    return (
      <article className="main-articl" key={id}>
        <div className="img-wrapper">
          <Image
            className="main-img"
            height={281}
            width={183}
            src={posterPath}
            fallback={placeholderImage}
            alt="обложка фильма"
          />
        </div>
        <div className="info-wrapper">
          <Title>{title}</Title>
          <Paragraph className="date-p">{formattedDate}</Paragraph>
          <div className="wpapper-description">
            <p className="description-p">{overview}</p>
          </div>
        </div>
      </article>
    );
  }
}
