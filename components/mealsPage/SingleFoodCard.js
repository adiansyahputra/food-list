import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classes from './SingleFoodCard.module.scss';
import Title from '../text/Title';

export default function SingleFoodCard({ food }) {
  return (
    <Link href={`/foods/${food.idMeal}`} className={classes.item}>
      <Image src={food.strMealThumb} height="200" width="200" priority alt="food list" />
      <Title className={classes.title} variant="secondary">{food.strMeal}</Title>
    </Link>
  );
}
