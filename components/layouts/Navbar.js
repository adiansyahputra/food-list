import Link from 'next/link';
import React from 'react';

import Image from 'next/image';
import classes from './Navbar.module.scss';
import logo from '../../images/foodList.png';

export default function Navbar() {
  return (
    <nav className={classes.navbar}>
      <Link href="/" legacyBehavior>
        <a className={classes.logo}>
          <Image src={logo} alt="Food logo" priority />
        </a>
      </Link>
      <ul className={classes.navLinks}>
        <li>
          <Link href="/foods">Foods</Link>
        </li>
        <li>
          <Link href="/savedFoods">Saved List</Link>
        </li>
      </ul>
    </nav>
  );
}
