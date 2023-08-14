import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteHeroesThunk, getHeroesThunk, updateHeroesThenk } from '../../store/slices/heroesSlice';
import styles from "./heroesList.module.css";

import defaultPhoto from "./1348460.jpg";

function HeroesList({
  heroes,
  isFetching,
  error,
  getHeroes,
  deleteHero,
  updateHero
}) {
  useEffect(() => getHeroes(), []);

const mapHeroes = (h) => {
  return (
    <li key={h.id}>
      <h2> {h.nickname}</h2>
      <div className={styles.mainElementOfList}>
        <div className={styles.itemVsCheck}>
          <div>
            {" "}
            <img
              src={h.image ? `http://localhost:5001/${h.image}` : defaultPhoto}
              alt={h.nickname}
            />
          </div>
          is Good:{" "}
          <input
            className="checkbox"
            type="checkbox"
            checked={h.isGood}
            onChange={() => {
              updateHero(h.id, { isGood: !h.isGood });
            }}
          />
        </div>

        <div className={styles.textBlock}>
          <p> Id: {h.id} </p>
          <p> Real name: {h.realName}</p>
          <p> Hero Description: {h.originDescription} </p>
          <p> Catch phrase: {h.catchPhrase}</p>
        </div>
      </div>
      <button onClick={() => deleteHero(h.id)}>Delete</button>
    </li>
  );
  };
  
  return (
    <>
      {error && <div>ERROR! </div>}
      {isFetching && <div> Loading...</div>}
      {!error && !isFetching && <ul className={styles.heroesList}>  {heroes.map(mapHeroes)} </ul>}
    </>
  );
}

const mapStateToProps = state => state.heroData
const mapDispatchToProps = dispatch => {
  return {
    getHeroes: () => { dispatch(getHeroesThunk()) },
    deleteHero: id => { dispatch(deleteHeroesThunk(id)) },
    updateHero: (id, updatedData)=> dispatch (updateHeroesThenk({id, updatedData}))
}}

export default connect(mapStateToProps, mapDispatchToProps)(HeroesList);