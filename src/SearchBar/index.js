import React, { useState, useRef, useEffect } from 'react'; // Import React and necessary hooks
import cx from 'classnames'; // Import classnames utility
import PropTypes from 'prop-types'; // Import PropTypes for defining prop types
import CustomInput from '../CustomInput'; // Import CustomInput component
import debounce from '../utlis/debounce'; // Import debounce utility function
import { getCityInfo } from '../apis'; // Import getCityInfo function from API module
import styles from './index.module.scss'; // Import component styles

const Icon = () => {
  return <img src={require('../assets/Icons/search.png')} width={'20px'} />;
};

const cityApiToken = process.env.CITY_API_TOKEN;
const cityApiBaseUrl = process.env.CITY_API_BASE_URL;

// Define a functional component named SearchBar
function SearchBar({ handleCityClick, loader }) {
  const [cityList, setCityList] = useState([]); // State for storing city list
  const [showCityBox, setShowCityBox] = useState(false); // State for controlling visibility of city list box
  const [inputValue, setInputValue] = useState(undefined); // State for input value
  const boxRef = useRef(null); // Reference for the city list box element

  // Function to fetch city list from API
  const fetchCityList = (args) => {
    getCityInfo(cityApiBaseUrl, cityApiToken, args.value).then((data) => {
      if (data) {
        setCityList(data);
      } else {
        setCityList([]);
      }
    });
  };

  // Event handler for input focus
  const onFocus = () => {
    setInputValue(undefined); // Reset input value
    setShowCityBox(true); // Show city list box
  };

  // Event handler for enter key press
  const onEnter = ({ value }) => {
    handleCityClick && handleCityClick(value); // Call handleCityClick function if provided
    setShowCityBox(false); // Hide city list box
  };

  // Event handler for click outside the component
  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setShowCityBox(false); // Hide city list box if click is outside the component
    }
  };

  // Debounced function for fetching city list
  const debouncedSearchData = debounce(fetchCityList, 300);

  // Effect hook to add and remove click event listener for handling clicks outside the component
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  // Render the SearchBar component

  return (
    <div className={styles.searchBox} ref={boxRef}>
      <CustomInput
        boxClassName={cx(styles.box, {
          [styles.inputBoxHideBorder]: showCityBox && cityList.length
        })}
        icon={<Icon />}
        inputClassName={styles.inputBox}
        onChange={debouncedSearchData}
        onFocus={onFocus}
        onEnter={onEnter}
        value={inputValue}
        placeholder={'Enter city name'}
        disabled={loader}
      />
      {showCityBox && cityList.length > 0 ? (
        <div className={styles.cityList}>
          {cityList.map((city, index) => {
            return (
              <div
                key={index}
                className={styles.cityList__item}
                onClick={() => {
                  handleCityClick(city?.name);
                  setInputValue(city?.name);
                  setShowCityBox(false);
                }}
              >
                {city?.name}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

SearchBar.propTypes = {
  handleCityClick: PropTypes.func,
  loader: PropTypes.bool,
};

export default SearchBar;
