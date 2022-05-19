import React from "react";
import Paginator from "../Paginator/Paginator";
import s from "./News.module.css";
import errorPhoto from "./../../photos/errorPhoto.jpg"

const News = (props) => {
  const newsKeys = Object.keys(props.news);

  const news = {
    author: null,
    content: null,
    description:
      "Дмитрий Бивол &mdash; автор одной из главных сенсаций в мире бокса за последние годы. Россиянин защищал титул WBA в полутяжелом весе в поединке с Саулем Альваресом, абсолютным чемпионом мира в полусреднем весе и лучшим боксером мира вне зависимости от весовой…",
    publishedAt: "2022-05-08T15:52:49Z",
    source: { id: null, name: "Sportmk.ru" },
    title: "Жена Дмитрия Бивола: ее муж побил лучшего боксера мира - МК-Спорт",
    url: "https://www.sportmk.ru/photo/gallery/28294-542926.html",
    urlToImage:
      "https://www.mk.ru/upload/entities/2022/05/08/13/photoreportsImages/detailPicture/98/99/fa/84/a786e299cabd99b1b061d5eeca004aa2.jpg",
  };
  return (
    <div className={s.news}>
      <Paginator
        setPage={props.setNewsPage}
        totalCount={props.totalCount}
        count={props.count}
        page={props.page}
      />
      <div className={s.newsWindow}>
        {newsKeys.map((id) => {
          return (
            <div className={s.newsDiv} key={id}>
              <a className={s.newsA} target={'_blank'} href={props.news[id].url}>              <div className={s.leftDiv}>
            <div className={s.imgDiv}><img className={s.newsImg} src={props.news[id].urlToImage||errorPhoto}/></div>
            <div className={s.sourceDiv}>
                  <p className={s.sourceP}>
                    Источник:{" "}
                    {(
                      <a
                        target={"_blank"}
                        className={s.sourceA}
                        href={`http://${props.news[id].source.name}`}
                      >
                        {props.news[id].source.name}
                      </a>
                    ) || "Неизвестен"}
                  </p>
                </div>
              </div>
              <div className={s.rightDiv}>
                {" "}
                <div className={s.titleDiv}>
                  <p className={s.titlleP}>{props.news[id].title}</p>
                </div>
                <div className={s.descriptionDiv}>
                  <p className={s.descriptionP}>{props.news[id].description}</p>
                </div>

              </div></a>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
