import React from 'react'
import { useParams } from 'react-router-dom';

const Recipe = () => {
const {id} = useParams();


  return (
    <h1>Recipe Page! {id}</h1>
  );
}

export default Recipe;