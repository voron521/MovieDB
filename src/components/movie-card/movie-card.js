import { Component } from 'react';
import './movie-card.css';
import { Image, Typography } from 'antd';

import { format } from 'date-fns';
import Loader from '../loader';
import BlockCards from './block-card';
import SwapyServices from '../services';
const { Title, Paragraph } = Typography;

// eslint-disable-next-line react/prefer-stateless-function
export default class MovieCard extends Component {
  swapiService = new SwapyServices();
  state = {
    imgLoad: true,
    blopUrl: '',
    loadInfo: this.props.stateLoad,
  };

  async getImgUrl(url) {
    this.swapiService.loadinImg(url);
    console.log('resGetImg', this.swapiService.state.imageUrl);
  }
  componentDidMount() {
    const { posterPath } = this.props;
    this.getImgUrl(posterPath);
  }
  componentDidUpdate(prevProps) {
    if (this.props.stateLoad !== prevProps.stateLoad) {
      this.setState({ loadInfo: this.props.stateLoad });
    }
  }

  render() {
    const { id, title, overview, posterPath, releaseDate, loadStatus } = this.props;
    console.log('статус загрузки', loadStatus);

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
        {loadStatus ? (
          <Loader />
        ) : (
          <BlockCards
            title={title}
            overview={overview}
            posterPath={posterPath}
            formattedDate={formattedDate}
            placeholderImage={placeholderImage}
          />
        )}
      </article>
    );
  }
}
