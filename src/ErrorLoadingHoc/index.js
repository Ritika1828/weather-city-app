import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.scss'

function ErrorLoadingHoc({err, loading, noResultFound, children, initialPage} ) {

    const getRenderElement = () => {
        if(loading) {
            return (
                <div className={styles.container__loader}>
                    <div className={styles.img__container}>
                    <img  src={require('../assets/loader.gif')}/>
                    </div>
                    
                    <div className={styles.container__loader__text}> Loading.... </div>

                </div>
            )
        }   else if (initialPage) {
            return (
                <div className={styles.container__noResults}>
                    <div className={styles.img__container}>
                     <img  src={require('../assets/intialPageImg.png')}/>
                    </div>
                    <div className={styles.container__noResults__text}> To get Weather Report, please search your city  </div>

                </div>
            )

            
        }
        else if (noResultFound) {
            return (
                <div className={styles.container__noResults}>
                    <div className={styles.img__container}>
                    <img  src={require('../assets/no-results.png')}/>
                    </div>
                    
                    <div className={styles.container__noResults__text}> No Result Found , Please Enter the Correct City  </div>
                 </div>
        )

        }  
        else if (err) {
            return (
                <div className={styles.container__noResults}>
                    <div className={styles.img__container}>
                    <img  src={require('../assets/intialPageImg.png')}/>
                    </div>
                    
                    <div className={styles.container__noResults__text}> Something went wrong, please try after sometime </div>
                </div>
            )
        }
else {
            return children
        }
    }


  return (
    <div className={styles.container}>
      {getRenderElement()}
    </div>
  )
}

ErrorLoadingHoc.propTypes = {}

export default ErrorLoadingHoc


