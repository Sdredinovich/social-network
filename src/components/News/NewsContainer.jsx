import { useEffect } from "react";
import { connect } from "react-redux";
import {
  getNews,
  setNewsPage,
  setNewsLoadingAC,
} from "../../redux/newsReducer";
import News from "./News";

const NewsContainer = (props) => {
  useEffect(() => {
    return () => {
      props.setNewsLoadingAC(true);
    };
  }, []);
  useEffect(() => {
    
    props.getNews(props.page, props.count);
  }, [props.page]);

  return (
    <>
      {props.loading ? (
        <h1>Загрузка...</h1>
      ) : (
        <News
          page={props.page}
          count={props.count}
          totalCount={props.totalCount}
          setNewsPage={props.setNewsPage}
          news={props.news}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.newsPage.news,
    loading: state.newsPage.loading,
    totalCount: state.newsPage.totalCount,
    count: state.newsPage.count,
    page: state.newsPage.page,
  };
};

export default connect(mapStateToProps, {
  getNews,
  setNewsPage,
  setNewsLoadingAC,
})(NewsContainer);
