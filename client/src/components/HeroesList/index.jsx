import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteHeroesThunk, getHeroesThunk, updateHeroesThenk } from '../../store/slices/heroesSlice';

//import defaultPhoto from "./1348460.jpg";
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
      <img
        src={h.image ? `http://localhost:5001/${h.image}` : defaultPhoto} 
        alt={h.nickname}
        style={{
          width: "100px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <input
        type="checkbox"
        checked={h.isGood}
        onChange={() => {
          updateHero(h.id, { isGood: !h.isGood });
        }}
      />
      <h2>{h.image}</h2>
      <h2>{h.nickname}</h2>
      <div> {h.id} </div>
      <div> {h.realName} </div>
      <div> {h.originDescription}</div>
      <button onClick={() => deleteHero(h.id)}>Delete</button>
    </li>
  );
  };
  
  return (
    <div>
      {error && <div>ERROR! </div>}
      {isFetching && <div> Loading...</div>}
      {!error && !isFetching && <ul> {heroes.map(mapHeroes)} </ul>}
    </div>
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