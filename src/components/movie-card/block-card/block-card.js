import { Component } from 'react';

import './block-card.css';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Image, Typography } from 'antd';
import Loader from '../../loader';
const { Title, Paragraph } = Typography;

export default class BlockCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  handleImageLoad = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { title, overview, posterPath, formattedDate, placeholderImage } = this.props;
    const { isLoading } = this.state;

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
          />
        </div>
        <div className="info-wrapper">
          <Title>{title}</Title>
          <Paragraph className="date-p">{formattedDate}</Paragraph>

          <div className="wpapper-description">
            <p className="description-p">{overview}</p>
          </div>
        </div>
      </>
    );
  }
}
