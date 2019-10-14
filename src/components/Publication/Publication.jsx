import React from 'react';
import PropTypes from 'prop-types';
import styles from './Publication.module.css';

const Publication = ({ title, text, id }) => (
  <article className={styles.publication} key={id}>
    <h2>{title}</h2>
    {text.length > 1000 ? (
      <p>{`${text.slice(0, 1000)}...`}</p>
    ) : (
      <p>{`${text}`}</p>
    )}
  </article>
);

Publication.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Publication;
