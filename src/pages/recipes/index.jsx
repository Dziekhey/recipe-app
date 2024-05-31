import { Card, CardContent, CardMedia, Container, Grid, TextField, Typography, CardActionArea } from "@mui/material";
import { useEffect, useState } from "react";
import Nodata from '../../assets/Images/Nodata.svg';
import ripples from '../../assets/Images/ripples.svg';
import { Link } from "react-router-dom";
import Navbar from "../../component/navbar/index";


export default function Recipes() {
const [recipes, setRecipes] = useState([]);
const [keyword, setKeyword] = useState('');
const [loading, setLoading] = useState(false);

const getRecipes = () => {
    setLoading(true);
    // Prepare url
    // const url = new URL('https://api.spoonacular.com/recipes/complexSearch');
    const url = new URL(`${process.env.REACT_APP_RECIPE_API_URL}/recipes`);
    // url.searchParams.append ('apiKey', process.env.REACT_APP_SPOONACULAR_API_KEY);
    // url.searchParams.append('query', keyword);

    // fetch recipes from API
    fetch (url)
    .then(response => response.json())
    .then(data => {
        // Update recipes state
        // setRecipes(data.results);
        setRecipes(data);
        // console.log(data);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(() => setLoading(false))
}

useEffect(getRecipes, [keyword]);

    return (
        <>
        <Navbar />
        <Container sx={{ my: "2rem" }}>
            <TextField
                fullWidth
                id="outlined-basic"
                label="Enter a keyword to search recipes and hit Enter"
                variant="outlined" 
                onKeyDown={event => event.key === 'Enter' && setKeyword(event.target.value)}/>

            <Grid sx={{ mt: "1rem", justifyContent:'center' }} container spacing={3}>
              {loading ? <img src={ripples} alt="Loading" width='50%'/> : recipes.length > 0 ? recipes.map(recipe => (  <Grid key={recipe._id} item xs={4}>
                    <Card sx={{ maxWidth: 345, height:'100%' }}>
                        <CardActionArea sx={{height:'100%'}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`https://savefiles.org/${recipe.image}?shareable_link=218`}
                                alt={recipe.title}
                            />
                            <CardContent sx={{height:'100%'}}>
                               <Link to={`/recipes/${recipe._id}`}>
                               <Typography gutterBottom variant="h5" component="div">
                                    {recipe.title}
                                </Typography>
                               </Link>
                                
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>)): <img src={Nodata} alt="No data" width='30%' />}
            </Grid>
        </Container>
        </>
    );
}