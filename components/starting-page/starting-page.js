'use client';
import classes from './starting-page.module.css';
import React, { useEffect, useState } from 'react';


function StartingPageContent() {
  // Show Link to Login page if NOT auth

 

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
}

export default StartingPageContent;
