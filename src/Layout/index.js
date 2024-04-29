import React from 'react'; // Import React
import PropTypes from 'prop-types'; // Import PropTypes for defining prop types
import styles from './index.module.scss'; // Import component styles

// Define the Layout functional component which takes children as props
function Layout({ children }) {
  return (
    <div className={styles.app}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node // Define prop types: children should be a node
};

export default Layout;
