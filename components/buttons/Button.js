import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import classes from './Button.module.scss';

function ButtonWithLink({ link = '/', children, variant = 'secondary' }) {
  return (
    <Link
      href={link}
      type="button"
      className={clsx(classes.button, classes[`variant__${variant}`])}
    >
      {children}
    </Link>
  );
}

function Button({
  children, variant = 'secondary', className, onClick,
}) {
  return (
    <button
      type="button"
      className={clsx(classes.button, classes[`variant__${variant}`], className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonWithLink;
export { Button };
