import React from 'react';
import clsx from 'clsx';
import classes from './Title.module.scss';

export default function Title({ children, className, variant = 'primary' }) {
  return (
    <h2
      className={clsx(classes.title, className, classes[`title__${variant}`])}
    >
      {children}
    </h2>
  );
}
