import React, { useRef, useState } from "react";
import s from "./ProfilePhoto.module.css";
import LargePhoto from "./../../../LargePhoto/LargePhoto";
import avatar from "./../../../../photos/anonim.png";
import { useDispatch } from "react-redux";
import { putProfilePhoto } from "../../../../redux/profileReducer";

const ProfilePhoto = (props) => {
  const dispatch = useDispatch()
  const [openPhoto, setOpenPhoto] = useState(false);
  const inpRef = useRef(null);
  const inpClick = () => {
    inpRef.current.click();
  };

  const changedPhoto = (e) => {
    if (e.target.files.length) {
      dispatch(putProfilePhoto(e.target.files[0]))
    }
  };
  return (
    <div className={s.profilePhoto}>
      <div className={s.avaBtnDiv}>
        <div className={s.avaDiv}>
        {props.photo && (
          <div               onClick={() => {
            setOpenPhoto(true);
          }} className={s.increaseDiv}>

          </div>
        )}
        <img className={s.ava} alt="avatar" src={props.photo || avatar} />
        </div>
        {props.itsMe && (
        <button onClick={inpClick} className={s.postPhotoBtn}>
          <input accept="image/*"
            className={s.photoInp}
            ref={inpRef}
            name="profilePhoto"
            type={"file"}
            onChange={changedPhoto}
          />
            ОБНОВИТЬ ФОТО

        </button>
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
