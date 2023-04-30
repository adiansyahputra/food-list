import clsx from 'clsx';
import React from 'react';
import classes from './Text.module.scss';

export default function Text({ children, className }) {
  return <p className={clsx(classes.text, className)}>{children}</p>;
}
