import React, { useState, useEffect, useCallback } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'us', category = 'business', pageSize = 10, setProgress, apikey }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = useCallback(async (pageToLoad, initialLoad = false) => {
    if (initialLoad) {
      setProgress(0);
    }
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apikey}&page=${pageToLoad}&pageSize=${pageSize}`;    
    console.log('Fetching news from URL:', url);
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (initialLoad) {
        setProgress(30);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const parsedData = await response.json();
      console.log('API Response:', parsedData);
      if (initialLoad) {
        setProgress(70);
      }
      if (parsedData && parsedData.articles) {
        setArticles((prevArticles) => {
          const newArticles = initialLoad ? parsedData.articles : prevArticles.concat(parsedData.articles);
          console.log('New Articles:', newArticles);
          return newArticles;
        });
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        if (initialLoad) {
          setProgress(100);
        }
      } else {
        console.error('Unexpected response structure:', parsedData);
        setArticles([]);
        if (initialLoad) {
          setProgress(100);
        }
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setArticles([]);
      if (initialLoad) {
        setProgress(100);
      }
    }
  }, [country, category, pageSize, setProgress, apikey]);

  useEffect(() => {
    fetchNews(1, true);
    document.title = `${capitalizeFirstLetter(category)} News`;
  }, [category, fetchNews]);

  const fetchMoreData = () => {
    setPage(prevPage => {
      const nextPage = prevPage + 1;
      fetchNews(nextPage);
      return nextPage;
    });
  };

  return (
    <div className='container'>
      <h1 className='text-center' style={{ margin: '35px 0px' }}>
        News - Top {capitalizeFirstLetter(category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4 col-sm-12" key={`${article.url}-${index}`}>
                <NewsItem
                  title={article.title || ""}
                  description={article.description || ""}
                  imgUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
  apikey: PropTypes.string.isRequired,
};

export default News;
