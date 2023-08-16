import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteHeroesThunk,
  getHeroesThunk,
  updateHeroesThenk,
} from "../../store/slices/heroesSlice";
import styles from "./heroesList.module.css";

import defaultPhoto from "./1348460.jpg";

function HeroesList({
  heroes,
  isFetching,
  error,
  getHeroes,
  deleteHero,
  updateHero,
}) {
  useEffect(() => getHeroes(), []);

  const mapHeroes = (h) => {
    return (
      <li key={h.id}>
        <h2> {h.nickname}</h2>
        <div className={styles.mainElementOfList}>
          <div>
            <img
              src={h.image ? `http://localhost:5001/${h.image}` : defaultPhoto}
              alt={h.nickname}
            />
          </div>
          <div className={styles.textBlock}>
            <table>
              <thead/>
              <tbody>
                <tr>
                  <td>Real name:</td>
                  <td>
                    {h.realName ? <div> {h.realName}</div> : "Nobody knows"}
                  </td>
                </tr>
                <tr>
                  <td>Hero description:</td>
                  <td>
                    {h.originDescription ? (
                      <div>{h.originDescription} </div>
                    ) : (
                      "We can't describe this Hero"
                    )}{" "}
                  </td>
                </tr>
                <tr>
                  <td>Catch phrase:</td>
                  <td>
                    {h.catchPhrase ? (
                      <div> {h.catchPhrase} </div>
                    ) : (
                      "He haven't any catch phrase"
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Is good: </td>
                  <td>
                    {" "}
                    <input
                      className="checkbox"
                      type="checkbox"
                      checked={h.isGood}
                      onChange={() => {
                        updateHero(h.id, { isGood: !h.isGood });
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={() => deleteHero(h.id)}>Delete</button>
        </div>
      </li>
    );
  };

  return (
    <>
      {error && <div>ERROR! </div>}
      {isFetching && <div> Loading...</div>}
      {!error && !isFetching && (
        <ul className={styles.heroesList}> {heroes.map(mapHeroes)} </ul>
      )}
    </>
  );
}

const mapStateToProps = (state) => state.heroData;
const mapDispatchToProps = (dispatch) => {
  return {
    getHeroes: () => {
      dispatch(getHeroesThunk());
    },
    deleteHero: (id) => {
      dispatch(deleteHeroesThunk(id));
    },
    updateHero: (id, updatedData) =>
      dispatch(updateHeroesThenk({ id, updatedData })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeroesList);
