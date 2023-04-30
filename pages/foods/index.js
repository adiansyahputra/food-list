import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import classes from './foods.module.scss';
import SearchBar from '../../components/mealsPage/SearchBar';
import PointText from '../../components/text/PointText';
import Categories from '../../components/categories/Categories';
import SingleFoodCard from '../../components/mealsPage/SingleFoodCard';

const override = {
  display: 'inline-block',
  margin: '0 auto',
};

const getCategories = async () => {
  const { data } = await axios.get('/categories.php');
  return data.categories;
};

const getFoods = async ({ queryKey }) => {
  const { data } = await axios.get(`/filter.php?c=${queryKey[1]}`);
  return data?.meals || [];
};

const getQueriedFoods = async ({ queryKey }) => {
  const { data } = await axios.get(`/search.php?s=${queryKey[1]}`);
  return data?.meals || [];
};

export default function Foods() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  const {
    data: categories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
  } = useQuery(['categories'], getCategories);

  const { data, isLoading, isError } = useQuery(
    ['foodsByCategory', selectedCategory],
    getFoods,

    { enabled: query === '' },
  );

  const { data: queriedData, isLoading: queryIsLoading } = useQuery(['foodsByQuery', query], getQueriedFoods, { enabled: query !== '' });

  useEffect(() => {
    if (categories) {
      setSelectedCategory(categories[0].strCategory);
    }
  }, [categories]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText) {
        setQuery(searchText);
        setSelectedCategory('');
      } else {
        setQuery('');
        if (categories) {
          setSelectedCategory(categories[0].strCategory);
        }
      }
    }, 300);
    return (() => {
      setQuery('');
      clearTimeout(timeout);
    });
  }, [searchText, categories]);

  return (
    <div className={classes.foods__page}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <PointText className={classes.text}>
        search foods or select categories from below.
      </PointText>
      <Categories
        categories={categories}
        categoriesIsLoading={categoriesIsLoading}
        categoriesIsError={categoriesIsError}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setQuery={setQuery}
      />
      {isLoading || categoriesIsLoading ? (
        <div className={classes.loadingSpinner}>
          <BeatLoader
            color="#fff"
            loading={isLoading || categoriesIsLoading}
            cssOverride={override}
            size={20}
          />
        </div>
      ) : null}

      <div className={classes.foods__container}>
        {!isLoading
        && !isError
        && data
        && data.map((food) => (
          <SingleFoodCard food={food} key={food.idMeal} />
        ))}
        {!queryIsLoading && queriedData && queriedData.map((food) => (
          <SingleFoodCard food={food} key={food.idMeal} />
        ))}
      </div>
    </div>
  );
}
