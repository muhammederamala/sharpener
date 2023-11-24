import React, { Fragment } from "react";

import TourList from "../components/TourList";
import classes from "./HomeScreen.module.css";
import Footer from '../Header/Footer'

function HomeScreen(props) {
  const concertEvents = [
    {
      date: "JUL 16",
      location: "DETROIT, MI",
      venue: "DTE ENERGY MUSIC THEATRE",
    },
    {
      date: "JUL 19",
      location: "TORONTO, ON",
      venue: "BUDWEISER STAGE",
    },
    {
      date: "JUL 22",
      location: "BRISTOW, VA",
      venue: "JIGGY LUBE LIVE",
    },
    {
      date: "JUL 29",
      location: "PHOENIX, AZ",
      venue: "AK-CHIN PAVILION",
    },
    {
      date: "AUG 2",
      location: "LAS VEGAS, NV",
      venue: "T-MOBILE ARENA",
    },
    {
      date: "AUG 7",
      location: "CONCORD, CA",
      venue: "CONCORD PAVILION",
    },
  ];

  return (
    <Fragment>
      <div className={classes.welcomeContainer}>
        <h1 className={classes.mainTitle}>The Generics</h1>
        <div className={classes.centerButton}>
          <button>Get Our Latest Album</button>
        </div>
        <div className={classes.centerButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="currentColor"
            class="bi bi-play-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445" />
          </svg>
        </div>
      </div>
      <h1 className={classes.centerButton}>Tours</h1>
      {concertEvents.map(event =>{
        return <TourList event={event} />
      })}
      <div style={{minHeight:"50px"}}></div>
      <Footer/>
    </Fragment>
  );
}

export default HomeScreen;
