import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Container, IconButton, Collapse, Box, Alert } from "@mui/material";
import Navbar from "../../component/navbar/index";

const countries = [
  { value: "GH", label: "Ghana"},
  { value: "NG", label: "Nigeria"},
  { value: "TG", label: "Togo"},
  { value: "AU", label: "Australia"},
];


export default function AddRecipe() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("New Recipe Added Successfully!");

  const addRecipe = async (event) => {
    // Set loading to true
    setLoading(true);
    // Prevent default form submit behavior
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target);
    // Post form data to the backend
    const response = await fetch(`${process.env.REACT_APP_RECIPE_API_URL}/recipes`, {
      method: "POST",
      body: formData, 
    });
    // const data = await  response.json();
    // console.log(response);
    // Update message based on response status
    if (response.status !== 201) {
      setMessage('Failed to add recipe!')
    };
    // Open collapsible Alert
    setOpen(true);
    // Set loading to false
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <Container sx={{ my: "2rem" }} maxWidth="lg">
        <h1 sx justifyContent="center" alignItems="center">
          Add recipes
        </h1>
        <form onSubmit={addRecipe}>
        <TextField
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          name="description"
          multiline
          rows={2}
          // defaultValue="Default Value"
          fullWidth
          sx={{ my: "2rem" }}
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          name="country"
          defaultValue="GH"
          helperText="Please select your country"
          fullWidth
          sx={{ my: "1rem" }}
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{ mb: "2rem" }}
          InputLabelProps={{
            shrink: true,
          }}
          type="file"
          fullWidth
          name="image"
          label="Recipe Image"
        />
        <Box textAlign="center">
          <Collapse in={open}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);                
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          </Collapse>

          <LoadingButton
            sx={{ width: "50%" }}
            loading={loading}
            type="submit"
            size="large"
            color="success"
            variant="contained">
            Add New Recipe
          </LoadingButton>
        </Box>
        </form>
      </Container>
    </div>
  );
}
