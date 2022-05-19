import React, { useRef } from "react";
import s from "./LargePhoto.module.css";
import exit from "./../../photos/exit.svg";

const LargePhoto = ({ setOpenPhoto, photo, name }) => {
  const openDiv = useRef(null);
  const exitSvg = useRef(null);
  const openDivClicked = (e) => {
    if (e.target === openDiv.current || e.target === exitSvg.current) {
      setOpenPhoto(false);
    }
  };
  return (
    <div ref={openDiv} className={s.avaOpenDiv} onClick={openDivClicked}>
      <div className={s.avaOpenDiv2}>
        <img className={s.avaOpenImg} src={photo} />
        <img ref={exitSvg} className={s.exitImg} src={exit} />
        <p>
          Главная фотография <span>{name}</span>
        </p>
        <a className={s.origImgLink} target={"_blank"} href={`${photo}`}>
          Открыть оригинал
        </a>
      </div>
    </div>
  );
};

export default LargePhoto;
