import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import ripples from "../../assets/Images/ripples.svg";
import { Container, Grid } from "@mui/material";
import Navbar from "../../component/navbar/index";

const getRecipe = (...args) => {
  // Prepare url
  const url = new URL(args[0]);
  url.searchParams.append("apiKey", process.env.REACT_APP_SPOONACULAR_API_KEY);
  //  fetch and return recipe
  return fetch(url).then((response) => response.json());
};

const Recipe = () => {
  const { id } = useParams();
  const { data, isLoading } = useSWR(
    `${process.env.REACT_APP_RECIPE_API_URL}/recipes/${id}`,
    getRecipe
  );
  // console.log(data, isLoading);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <img src={ripples} alt="Loading" />
      ) : (
        <div>
          <Container>
            <h1>{data.title}</h1>
          </Container>
          <Grid container xs={12} sx={{ padding: "20px" }}>
            <Grid item xs={6}>
              <img
                src={`https://savefiles.org/${data.image}?shareable_link=218`}
                alt={data.title}
                style={{ height: "70vh", width: '100%'}}
              />
            </Grid>
            <Grid item xs={6} sx={{ paddingLeft: "30px" }}>
              <h3>Description</h3>
              <div dangerouslySetInnerHTML={{ __html: data.description }} />
              <h3>Recipe Summary</h3>
              <div>
               {data.summary}
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default Recipe;
