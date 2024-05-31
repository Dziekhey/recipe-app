import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  IconButton,
  Collapse,
  Box,
  Alert,
  Grid,
} from "@mui/material";
import Navbar from "../../component/navbar/index";

const countries = [
  { value: "Ghana", label: "Ghana" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "Togo", label: "Togo" },
  { value: "Australia", label: "Australia" },
];

const Success = "New Recipe Added Successfully!"
const Failed = "Failed to add recipe!"

export default function AddRecipe() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(Success);

  const addRecipe = async (event) => {
    // Set loading to true
    setLoading(true);
    // Prevent default form submit behavior
    event.preventDefault();
    // Get form data
    const formData = new FormData(event.target);
    // Post form data to the backend
    const response = await fetch(
      `${process.env.REACT_APP_RECIPE_API_URL}/recipes`,
      {
        method: "POST",
        body: formData,
      }
    );
    // const data = await  response.json();
    // console.log(response);
    // Update message based on response status
    if (response.status !== 201) {
      setMessage(Failed);
    }
    // Open collapsible Alert
    setOpen(true);
    // Set loading to false
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <Box 
       height={200}
       width={200}
      //  my={4}
     
       alignItems="center"
       gap={4}
       pl={40}
      //  sx={{ border: '2px solid grey' }}
       >
        <h1>Add recipes</h1>
        <form onSubmit={addRecipe}>
          <Grid container spacing={2} sx={{ width: "60vw" }}>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="Title"
                name="title"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                name="description"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Summary"
                name="summary"
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-select-currency"
                select
                label="Select"
                name="country"
                defaultValue="Ghana"
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ mb: "1rem" }}
                InputLabelProps={{
                  shrink: true,
                }}
                type="file"
                fullWidth
                name="image"
                label="Recipe Image"
              />
            </Grid>
            <Box textAlign="center" pl={12}>
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
                  severity={message === Failed ? 'error': 'success'}
                  sx={{ mb: 2 }}
                >
                  {message}
                </Alert>
              </Collapse>

              <LoadingButton
                sx={{ width: "50vw"}}
                loading={loading}
                type="submit"
                size="large"
                color="success"
                variant="contained"
              >
                Add New Recipe
              </LoadingButton>
            </Box>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
