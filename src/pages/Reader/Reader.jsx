import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import itemsList from '../../db/publications.json';
import Publication from '../../components/Publication/Publication';
import Controls from '../../components/Controls/Controls';
import styles from './Reader.module.css';

const getItemFromProps = props => queryString.parse(props.location.search).item;

export default class Reader extends Component {
  state = {
    items: itemsList,
    currentPage: 0,
  };

  componentDidMount() {
    const { location, history } = this.props;
    const item = getItemFromProps(this.props);
    if (!item) {
      return history.push({
        pathname: location.pathname,
        search: `item=1`,
      });
    }
    return this.setState({
      currentPage: item - 1,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { location, history } = this.props;
    const { currentPage } = this.state;

    if (currentPage !== prevState.currentPage) {
      if (prevState.currentPage < currentPage) {
        history.push({
          pathname: location.pathname,
          search: `item=${currentPage + 1}`,
        });
      } else {
        history.push({
          pathname: location.pathname,
          search: `item=${currentPage + 1}`,
        });
      }
    }
  }

  handleClick = ({ target }) => {
    const { name } = target;
    if (name === 'previous') {
      this.setState(state => ({
        currentPage: state.currentPage - 1,
      }));
    } else {
      this.setState(state => ({
        currentPage: state.currentPage + 1,
      }));
    }
  };

  render() {
    const { currentPage } = this.state;
    const index = currentPage + 1;
    const { items } = this.state;
    const publication = items;
    return (
      <div className={styles.reader}>
        <Publication
          title={publication[currentPage].title}
          text={publication[currentPage].text}
          id={publication[currentPage].id}
        />
        <p className={styles.counter}>{`${index}/12`}</p>
        <Controls onClick={this.handleClick} index={currentPage} />
      </div>
    );
  }
}

Reader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
