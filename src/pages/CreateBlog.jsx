import React, { useState } from 'react'
import {Box,InputLabel,TextField,Typography,Button}from '@mui/material'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast';






function CreateBlog() {
    const navigate = useNavigate();
    const id = localStorage.getItem("userId");
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        image: "",
      });

       // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(" http://localhost:3000/api/v1/blog/create-blog", {
              title: inputs.title,
              description: inputs.description,
              image: inputs.image,
              user: id,
            });
            if (data?.success) {
             toast.success("Blog Created");
              navigate("/my-blogs");
            }
          } catch (error) {
            console.log(error);
          }
       
    };
  return (
    <>
       <form onSubmit={handleSubmit}>
        <Box className="box shadow custom-box"  width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px">
              <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="white"
          >
           <h2 className='text-primary'> Create A Blogs</h2>
          </Typography>

         <InputLabel  sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Title</InputLabel>
         <TextField   onChange={handleChange}  name="title" value={inputs.title} margin="normal"
            variant="outlined"  required
            />
            <InputLabel  sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Description</InputLabel>
         <TextField   onChange={handleChange}  name="description" value={inputs.description} margin="normal"
            variant="outlined"  required
            />
             <InputLabel  sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Image URL</InputLabel>
         <TextField   onChange={handleChange}  name="image" value={inputs.image} margin="normal"
            variant="outlined"  required
            />
             <Button type="submit" color="primary" variant="contained">
            SUBMIT
          </Button>
        </Box>
       </form>

        </>
  )
}

export default CreateBlog