import React,{Fragment} from 'react'

import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
import HeaderCartbutton from './HeaderCartbutton'

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartbutton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="image" />
      </div>
    </Fragment>
  )
}

export default Header
