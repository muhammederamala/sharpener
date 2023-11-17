import React from 'react'

import classes from './MealsSummary.module.css'

function MealsSummary() {
  return (
    <section className={classes.summary}>
      <h2>Delicious food delivered to you</h2>
      <p>
        Choose your favourite meal from our board selection of available Meals
        and enjoy a Delicious lunch or dinner at home.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients
        and by experienced chefs.
      </p>
    </section>
  )
}

export default MealsSummary
