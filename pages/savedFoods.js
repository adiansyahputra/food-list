import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';
import Image from 'next/image';
import { getSingleFood } from './foods/[id]';
import classes from './savedFoods.module.scss';
import Title from '../components/text/Title';
import Text from '../components/text/Text';
import PointText from '../components/text/PointText';

export default function SavedFoods() {
  const [savedFoodsId, setSavedFoodsId] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('savedFoods')) {
      setSavedFoodsId(JSON.parse(localStorage.getItem('savedFoods')));
    }
  }, []);

  const queries = savedFoodsId.map((id) => ({
    queryKey: ['singleFood', id],
    queryFn: getSingleFood,
  }));

  const result = useQueries({ queries });

  return (
    <div className={classes.pageWrapper}>
      <Title variant="primary" className={classes.pageTitle}>My Saved Food List</Title>
      <div className={classes.list_container}>
        {savedFoodsId.length <= 0 && <Text>You have no saved foods</Text>}
        {result && result.map(({ data, isLoading }, index) => {
          if (isLoading) {
            return (
              <BeatLoader color="#fff" key={savedFoodsId[index]} />
            );
          }
          return (
            <Link href={`/foods/${data.idMeal}`} key={data.idMeal} className={classes.item}>
              <Image src={data.strMealThumb} height="200" width="200" priority alt="food list" />
              <Title variant="secondary" className={classes.mealTitle}>{data.strMeal}</Title>
              <PointText>
                Category:
                {' '}
                {data.strCategory}
              </PointText>
              <PointText>
                Area:
                {' '}
                {data.strArea}
              </PointText>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
