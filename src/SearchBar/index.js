import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import CustomInput from '../CustomInput';
import debounce from '../utlis/debounce';
import { getCityInfo } from '../apis';
import styles from './index.module.scss';

const Icon = () => {
  return <img src={require('../assets/Icons/search.png')} width={'20px'} />;
};

const cityApiToken = process.env.CITY_API_TOKEN;
const cityApiBaseUrl = process.env.CITY_API_BASE_URL;

function SearchBar({ handleCityClick }) {
  const [cityList, setCityList] = useState([]);
  const [showCityBox, setShowCityBox] = useState(false);
  const [inputValue, setInputValue] = useState(undefined);
  const boxRef = useRef(null);

  const fetchCityList = (args) => {
    getCityInfo(cityApiBaseUrl, cityApiToken, args.value).then((data) => {
      if (data) {
        setCityList(data);
      } else {
        setCityList([]);
      }
    });
  };

  const onFocus = () => {
    setInputValue(undefined);
    setShowCityBox(true);
  };

  const onEnter = ({ value }) => {
    handleCityClick && handleCityClick(value);
    setShowCityBox(false);
  };

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setShowCityBox(false);
    }
  };

  const debouncedSearchData = debounce(fetchCityList, 300);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

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

SearchBar.propTypes = {};

export default SearchBar;
