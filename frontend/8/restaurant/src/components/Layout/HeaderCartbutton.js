import React from 'react'

import classes from './HeaderCartbutton.module.css'
import CartIcon from '../Cart/CartIcons'

function HeaderCartbutton(props) {
  return (
    <button className={classes.button} onClick={props.onClick} >
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>3</span>
    </button>
  )
}

export default HeaderCartbutton
