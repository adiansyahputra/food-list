import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { FaHeartBroken, FaHeart } from 'react-icons/fa';
import classes from './foods.module.scss';
import Text from '../../components/text/Text';
import Title from '../../components/text/Title';
import PointText from '../../components/text/PointText';
import IngredientsTable from '../../components/mealsPage/IngredientsTable';
import { Button } from '../../components/buttons/Button';

export const getSingleFood = async ({ queryKey }) => {
  const { data } = await axios.get(`/lookup.php?i=${queryKey[1]}`);
  return data?.meals?.[0];
};

export default function SingleFoodPage() {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const {
    data, isLoading, isError, error,
  } = useQuery(['singleFood', id], getSingleFood);

  useEffect(() => {
    if (localStorage.getItem('savedFoods')) {
      const savedFoods = JSON.parse(localStorage.getItem('savedFoods'));
      if (savedFoods.includes(id)) {
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }
    }
  }, [id]);

  if (isError) {
    return (
      <Text>
        Error:
        {' '}
        {error.message}
      </Text>
    );
  }

  if (isLoading || !data) {
    return <BeatLoader color="#fff" />;
  }

  const ingredients = Object.keys(data).filter((key) => key.startsWith('strIngredient')).filter((key) => data[key] !== '' && data[key] !== null);

  const ingredientsWithMeasures = ingredients.map((key, index) => (
    {
      index: index + 1,
      ingredient: data[key],
      measure: data[`strMeasure${index + 1}`],
    }
  ));

  const handleSaveButtonClick = () => {
    if (localStorage.getItem('savedFoods') === null) {
      localStorage.setItem('savedFoods', JSON.stringify([data.idMeal]));
      toast.success('Food Saved Successfully');
      setIsSaved(true);
    } else {
      const savedFoods = JSON.parse(localStorage.getItem('savedFoods'));
      if (!isSaved) {
        savedFoods.push(data.idMeal);
        localStorage.setItem('savedFoods', JSON.stringify(savedFoods));
        toast.success('Food Saved Successfully');
        setIsSaved(true);
      } else {
        savedFoods.splice(savedFoods.indexOf(data.idMeal), 1);
        localStorage.setItem('savedFoods', JSON.stringify(savedFoods));
        setIsSaved(false);
        toast.error('Food Removed Successfully');
      }
    }
  };

  return (
    <div className={classes.pageWrapper}>
      <div className={classes.topContainer}>
        <div className={classes.img}>
          <Image src={data.strMealThumb} height={300} width={300} alt="food picture" priority />
        </div>
        <div className={classes.info}>
          <Title variant="primary">{data.strMeal}</Title>
          <PointText className={classes.infoText}>
            Category :
            {' '}
            {data.strCategory}
          </PointText>
          <PointText className={classes.infoText}>
            Area :
            {' '}
            {data.strArea}
          </PointText>
          <PointText className={classes.infoText}>
            Tags :
            {' '}
            {data?.strTags?.split(',').join(', ')}
          </PointText>
          {isSaved && (
            <Text className={classes.greenText}>You already saved the food.</Text>
          )}
          <Button variant="primary" className={classes.saveButton} onClick={handleSaveButtonClick}>
            {isSaved ? (
              <>
                <FaHeartBroken />
                {' '}
                Remove
              </>
            ) : (
              <>
                <FaHeart />
                {' '}
                Save
              </>
            )}
          </Button>
        </div>
      </div>
      <div className={classes.ingredientsTable}>
        <IngredientsTable ingredientsWithMeasures={ingredientsWithMeasures} />
      </div>
      <div className={classes.instructions}>
        <Title>Instructions</Title>
        {data.strInstructions.split('.').filter((sentence) => sentence !== '').map((sentence) => (
          <PointText key={sentence}>
            {sentence}
            .
          </PointText>
        ))}
      </div>
    </div>
  );
}
