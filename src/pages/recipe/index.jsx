import React from 'react'
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import ripples from '../../assets/Images/ripples.svg'
import { Container } from '@mui/material';
import Navbar from '../../component/navbar/index'


const getRecipe = (...args) => {
   // Prepare url
   const url = new URL(args[0]);
   url.searchParams.append ('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
  //  fetch and return recipe
  return fetch (url).then(response => response.json());
}


const Recipe = () => {
const {id} = useParams();
const {data, isLoading} = useSWR(`${process.env.REACT_APP_RECIPE_API_URL}/recipes/${id}`, getRecipe)
// console.log(data, isLoading);

  return (
    <>
    <Navbar />
    {isLoading ? <img src={ripples} alt='Loading'/> :(
      <Container>
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{__html:data.summary}} />
        <img src={data.image} alt={data.title} />
      </Container>
    )}
    </>
  );
}

export default Recipe;