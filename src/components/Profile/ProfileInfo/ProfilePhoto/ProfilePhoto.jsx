import React, { useRef, useState } from "react";
import s from "./ProfilePhoto.module.css";
import LargePhoto from "./../../../LargePhoto/LargePhoto";
import avatar from "./../../../../photos/anonim.jpg";
import lupa from "./../../../../photos/lupa.svg";
import exit from "./../../../../photos/exit.svg";

const ProfilePhoto = (props) => {
  const [openPhoto, setOpenPhoto] = useState(false);
  const inpRef = useRef(null);
  const inpClick = () => {
    inpRef.current.click();
  };

  const changedPhoto = (e) => {
    if (e.target.files.length) {
      props.putProfilePhoto(e.target.files[0]);
    }
  };
  return (
    <div className={s.profilePhoto}>
      <div className={s.avaBtnDiv}>
        <div className={s.avaDiv}>
        {props.photo && (
          <div className={s.increaseDiv}>
            <img
              onClick={() => {
                setOpenPhoto(true);
              }}
              className={s.increaseImg}
              src={lupa}
            />
          </div>
        )}
        <img className={s.ava} alt="avatar" src={props.photo || avatar} />
        </div>
        {props.itsMe && (
        <div className={s.postPhotoDiv}>
          <input
            accept="image/*"
            className={s.photoInp}
            ref={inpRef}
            name="profilePhoto"
            type={"file"}
            onChange={changedPhoto}
          />
          <p className={s.inpBtn} onClick={inpClick}>
            ОБНОВИТЬ ФОТО
          </p>
        </div>
      )}
      </div>
 

      {openPhoto && (
        <LargePhoto
          setOpenPhoto={setOpenPhoto}
          photo={props.photo}
          name={props.fullName}
        />
      )}
    </div>
  );
};

export default ProfilePhoto;
