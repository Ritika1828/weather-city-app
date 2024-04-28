import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.app}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
