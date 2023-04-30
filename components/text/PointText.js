import React from 'react';
import clsx from 'clsx';
import classes from './PointText.module.scss';
import Text from './Text';

export default function PointText({ className, children }) {
  return (
    <div className={clsx(classes.pointText, className)}>
      <div className={classes.circle} />
      <Text>{children}</Text>
    </div>
  );
}
