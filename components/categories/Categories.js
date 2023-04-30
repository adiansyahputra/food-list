import React from 'react';
import { BeatLoader } from 'react-spinners';
import classes from './Categories.module.scss';
import CategoryItem from './CategoryItem';

export default function Categories({
  categories,
  categoriesIsLoading,
  categoriesIsError,
  selectedCategory,
  setSelectedCategory,
  setQuery,
}) {
  if (categoriesIsError) {
    return 'error';
  }

  if (categoriesIsLoading) {
    return <BeatLoader loading={categoriesIsLoading} color="#fff" />;
  }

  return (
    <div className={classes.categories__container}>
      {categories
        && categories.map((item) => (
          <CategoryItem
            category={item}
            key={item.idCategory}
            selectedCategory={selectedCategory}
            onClickHandler={() => {
              setSelectedCategory(item.strCategory);
              setQuery('');
            }}
          />
        ))}
    </div>
  );
}
