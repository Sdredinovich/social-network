import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import s from "./Search.module.css";

let timerID = null;

const Search = (props) => {
  const [state, setState] = useState("");
  useEffect(() => {
    return () => {
      props.setTerm("");
    };
  }, []);
  const changer = (e) => {
    setState(e.target.value);
    if (timerID !== null) {
      clearTimeout(timerID);
      timerID = null;
    }
    timerID = setTimeout(() => {
      timerID = null;
      props.setTerm(e.target.value)
    }, 1000);
  };
  return (
    <div className={s.search}>
      <input
        placeholder={props.placeholder}
        className={s.searchInput}
        value={state}
        onChange={(e) => {
          changer(e);
        }}
      />
    </div>
  );
};

export default Search;
