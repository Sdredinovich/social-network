import { newsApi } from "../API/api";

const SET_NEWS = "SET_NEWS";
const SET_LOADING = "SET_LOADING";
const SET_NEWS_PAGE = "SET_NEWS_PAGE";
const SET_NEWS_TOTALCOUNT = "SET_NEWS_TOTALCOUNT";

const initialState = {
  news: null,
  page: 1,
  count: 5,
  totalCount: 0,
  loading: true,
};
const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEWS:
      return {
        ...state,
        news: { ...action.value },
      };
    case SET_NEWS_TOTALCOUNT:
      return {
        ...state,
        totalCount: action.value,
      };
    case SET_NEWS_PAGE:
      return {
        ...state,
        page: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.value,
      };
    default:
      return state;
  }
};

export const setNewsLoadingAC = (value) => ({ type: SET_LOADING, value });
const setNewsAC = (value) => ({ type: SET_NEWS, value });
const setNewsTotalCount = (value) => ({ type: SET_NEWS_TOTALCOUNT, value });
export const setNewsPage = (value) => ({ type: SET_NEWS_PAGE, value });

export const getNews = (page, pageSize) => async (dispatch) => {
  const newsData = await newsApi.getNews(page, pageSize);
  dispatch(setNewsAC(newsData.data.articles));
  dispatch(setNewsTotalCount(newsData.data.totalResults));
  dispatch(setNewsLoadingAC(false));
};

export default newsReducer;
