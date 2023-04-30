import Image from 'next/image';
import React from 'react';
import Text from '../text/Text';
import classes from './HeroSection.module.scss';
import HeroImg from '../../images/foodsHero.jpg';
import ButtonWithLink from '../buttons/Button';

export default function HeroSection() {
  return (
    <section className={classes.hero__section}>
      <div className={classes.hero__container}>
        <div className={classes.hero__info}>
          <h1 className={classes.hero__title}>
            Find the perfect
            {' '}
            <span>food recipe</span>
            {' '}
            for you
          </h1>
          <Text>a listing website of food recipe</Text>
          <div className={classes.hero__buttons}>
            <ButtonWithLink link="/foods" variant="primary">
              Explore Foods
            </ButtonWithLink>
            <ButtonWithLink link="/savedFoods">Saved Foods</ButtonWithLink>
          </div>
        </div>
        <div className={classes.hero__img}>
          <Image
            src={HeroImg}
            width={400}
            height={400}
            alt="Food Hero"
            priority
          />
        </div>
      </div>
    </section>
  );
}
