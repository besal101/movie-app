import React from 'react';
import { useParams } from 'react-router';
import MovieGrid from '../components/movie-grid/MovieGrid';

import PageHeader from '../components/page-header/PageHeader';

const Catalog = () => {
  const param = useParams();
  const category = param.category ? param.category : '';
  const sortby = param.sortby ? param.sortby : '';
  return (
    <>
      <PageHeader>
        {category ? `Top ${category} Movies` : `Movie Based on ${sortby}`}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} sort_by={sortby} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
