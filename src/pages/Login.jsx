import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux"
import { authActions } from "../redux/store"
import toast  from 'react-hot-toast';





export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
   
    email: "",
    password: "",
  });

   //handle input change
   const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
   //form handle
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
     toast.success("User login Successfull");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
       <form   onSubmit={handleSubmit}>
      <Box  className="box shadow custom-box" maxWidth={450}
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            margin="auto"
            marginTop={5}
            padding={3}
            borderRadius={5}
            boxShadow="10px 10px 20px #ccc">
        <Typography style={{color:'blue'}}   variant="h4"  sx={{ textTransform: "uppercase" }}  padding={3}
              textAlign="center">
          Login
        </Typography>
       
        <TextField  placeholder="email"
              value={inputs.email}
              name="email"
              margin="normal"
              type={"email"}
              onChange={handleChange}
              required/>
        <TextField  placeholder="password"
             value={inputs.password}
              name="password"
              margin="normal"
              type={"password"}
              onChange={handleChange}
              required/>
        <Button style={{color:'white'}} type="submit"
              sx={{ borderRadius: 3, marginTop: 3 }}
              variant="contained"
              color="primary">Submit</Button>
        <Button  onClick={() => navigate("/register")} style={{color:'blue'}}  sx={{ borderRadius: 3, marginTop: 3 }}>Not a User ? Please Register</Button>
  
      </Box>
        
    </form>

      </>
  )
}
export default Login;
