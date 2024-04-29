import React from 'react'; // Import React
import PropTypes from 'prop-types'; // Import PropTypes for defining prop types
import styles from './index.module.scss'; // Import component styles

// Define the ErrorLoadingHoc functional component which takes err, loading, noResultFound, children, and initialPage as props
function ErrorLoadingHoc({ err, loading, noResultFound, children, initialPage }) {
  // Define a function to determine the element to render based on props
  const getRenderElement = () => {
    if (loading) {
      return (
        <div className={styles.container__loader}>
          <div className={styles.img__container}>
            <img src={require('../assets/loader.gif')} />
          </div>

          <div className={styles.container__loader__text}> Loading weather forecast .... </div>
        </div>
      );
    } else if (initialPage) {
      return (
        <div className={styles.container__noResults}>
          <div className={styles.img__container}>
            <img src={require('../assets/intialPageImg.png')} />
          </div>
          <div className={styles.container__noResults__text}>
            {' '}
            To get Weather Report, please search your city{' '}
          </div>
        </div>
      );
    } else if (noResultFound) {
      return (
        <div className={styles.container__noResults}>
          <div className={styles.img__container}>
            <img src={require('../assets/no-results.png')} />
          </div>

          <div className={styles.container__noResults__text}>
            {' '}
            No Result Found , Please Enter the Correct City{' '}
          </div>
        </div>
      );
    } else if (err) {
      return (
        <div className={styles.container__noResults}>
          <div className={styles.img__container}>
            <img src={require('../assets/intialPageImg.png')} />
          </div>

          <div className={styles.container__noResults__text}>
            {' '}
            Something went wrong, please try after sometime{' '}
          </div>
        </div>
      );
    } else {
      return children;
    }
  };

  return <div className={styles.container}>{getRenderElement()}</div>;
}

// Define prop types for the ErrorLoadingHoc component

ErrorLoadingHoc.propTypes = {
  err: PropTypes.string,
  loading: PropTypes.bool,
  noResultFound: PropTypes.bool,
  children: PropTypes.node,
  initialPage: PropTypes.bool
};

export default ErrorLoadingHoc;
