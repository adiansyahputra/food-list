import React from 'react';
import Image from 'next/image';
import classes from './Footer.module.scss';
import logo from '../../images/foodListGreen.png';
import Text from '../text/Text';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <Image src={logo} alt="logo" />
      <Text>Find the perfect food recipe for you</Text>
      <Text className={classes.copyright}>
        © “FoodsRecipe” 2023 All right reserved.
      </Text>
    </footer>
  );
}
