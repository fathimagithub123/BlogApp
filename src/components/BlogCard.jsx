
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast  from 'react-hot-toast';








export default function BlogCard({title,description,image,username,time,id,isUser,}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
      toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };


 
  return (
    
    <Card className='bg-primary' sx={{ width: '50%', margin:'auto',mt:2,padding:2,boxShadow:'5px 5px 10px #ccc',"hover:":{
      boxShadow:'10px 10px 20px #ccc'
    }, }}>

       {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info"  />
          </IconButton>
          <IconButton onClick={handleDelete} >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
           {username}
          </Avatar>
        }
        
        title={username}//doubt
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      
      <CardContent>
     
        <Typography variant="h6" color="text.secondary">
          Title : {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Description :{description}
        </Typography>

      </CardContent>
     
      
    </Card>
    
  );
}
