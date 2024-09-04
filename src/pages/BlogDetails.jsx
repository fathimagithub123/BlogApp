import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Box,InputLabel,TextField,Typography,Button}from '@mui/material'
import { useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast';






const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
       
      });
    
    

    // get blog details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
            title: data?.blog.title,
            description: data?.blog.description,
            image: data?.blog.image,
          });
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);
 

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
        const { data } = await axios.put(`http://localhost:3000/api/v1/blog/update-blog/${id}`, {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        });
        if (data?.success) {
        toast.success("Blog Updated");
          navigate("/my-blogs");
        }
      } catch (error) {
        console.log(error);
      }
   
};
console.log(blog);
  return (
    <> 
        <form onSubmit={handleSubmit}>
        <Box className="box shadow custom-box" width={"50%"}
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
           <h2 className='text-primary'> Update A Blog</h2>
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
            UPDATE
          </Button>
        </Box>
       </form>

        </>
  )
}

export default BlogDetails;