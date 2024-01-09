import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../redux/features/tourSlice";
import ArticleComponent from "./ArticleComponent";
import ArticleComponent2 from "./ArticleComponent2";
import ArticleSkeleton from "./ArticleSkeleton";
import Spin from "../Spin";
const Content = () => {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const fetchAgain = () => {
      if (articles != null) {
        fetch("https://dev.to/api/articles")
          .then((res) => res.json())
          .then((result) => setArticles([...articles, ...result]));
      }
    };

    const handleScroll = () => {
      const html = document.documentElement;
      const body = document.body;
      const windowheight =
        "innerHeight" in window ? window.innerHeight : html.offsetHeight;

      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );

      const windowBottom = windowheight + window.pageYOffset;
      if (windowBottom >= docHeight) {
        console.log("we reached the bottom");
        fetchAgain();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles]);

  useEffect(() => {
    setTimeout(async () => {
      const res = await fetch("https://dev.to/api/articles");
      const data = await res.json();

      setArticles(data);
      // console.log(data);
    }, 2000);
  }, []);

  const { user } = useSelector((state) => ({ ...state.auth }));

  const { tours, loading } = useSelector((state) => ({
    ...state.tour,
  }));

  const userId = user?.result?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getTours(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getTours(userId));
  }, [dispatch, userId]);

  const sortedTours = tours && [...tours].reverse().slice(0, 20);

  if (loading) {
    return <Spin />;
  }
  return (
    <Grid container>
      <main className="main-content">
        <header>
          <nav>
            <br />
            <a href="/#">Feed</a>
            <a href="/#">Week</a>
            <a href="/#">Month</a>
            <a href="/#">Infinity</a>
            <a href="/#">Latest</a>
          </nav>
          <select id="dropdown-select" className="dropdown">
            <option value="Feed" defaultValue>
              Feed
            </option>

            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Year">Feed</option>
            <option value="Infinity">Infinity</option>
          </select>
        </header>
        <div className="articles">
          {sortedTours &&
            sortedTours.map((item) => (
              <ArticleComponent
                creatorImage={item.creator.image}
                creatorName={item.creator.name}
                key={item._id} // Assuming '_id' is the unique identifier for each tour
                {...item}
              />
            ))}

          {articles &&
            articles.map((article, id) => {
              return <ArticleComponent2 key={id} data={article} />;
            })}

          {!articles && [1, 2, 3, 4, 5].map((a) => <ArticleSkeleton key={a} />)}
        </div>
      </main>
    </Grid>
  );
};

export default Content;
