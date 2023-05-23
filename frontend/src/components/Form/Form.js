// import React, {useState} from "react";
// import { TextField, Button,Typography, Paper } from "@material-ui/core";
// import fileBase from "react-file-base64";
// import { useDispatch } from "react-redux";

// import useStyles from './styles';
// import { createPost } from "../../actions/posts";

// const Form = () => {
//     const [postData, setPostData] = useState({
//        creator: '', title : '', message: '', tags: '', selectedFile: '' 
//     });
//     const classes = useStyles();
//     const dispatch = useDispatch();
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         dispatch(createPost(postData));
//     }

//     const clear = () => {
        
//     }
//     return (
//         <Paper className={classes.paper}>
//             <form autoComplete="off" noValidate className={'${classes.root}{classes.form}'} onSubmit={handleSubmit}>
//                 <Typography variant="h6"> Report Feed Posts </Typography>
//                 <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({...postData,creator: e.target.value})}/>
//                 <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({...postData,creator: e.target.value})}/>
//                 <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({...postData,creator: e.target.value})}/>
//                 <TextField name="location" variant="outlined" label="Location" fullWidth value={postData.location} onChange={(e) => setPostData({...postData,creator: e.target.value})}/>
//                 <TextField name="date" variant="outlined" label="Date" fullWidth value={postData.date} onChange={(e) => setPostData({...postData,creator: e.target.value})}/>
//                 <TextField name="time" variant="outlined" label="Time" fullWidth value={postData.time} onChange={(e) => setPostData({...postData,creator: e.target.value})}/>
              
//             <div className="{classes.fileInput}">
//                 <fileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})}/>
                
//             </div>
//             <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
//             <Button variant="contained"onClick={clear} fullWidth>Clear</Button>
//             </form>
//         </Paper>
//     );
// }


// export default Form;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({  creator: '', title: '', location: '', date: '', time: '', details: '', tags: '' , selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ creator: '', title: '', location: '', date: '', time: '', details: '', tags: '' , selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(updatePost(currentId, postData));
      clear();
      
    } else {
      dispatch(createPost(postData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Report Post Creation'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="location" variant="outlined" label="Location" fullWidth value={postData.location} onChange={(e) => setPostData({ ...postData, location: e.target.value })} />
        <TextField name="date" variant="outlined" label="Date" fullWidth value={postData.date} onChange={(e) => setPostData({ ...postData, date: e.target.value })} />
        <TextField name="time" variant="outlined" label="Time" fullWidth value={postData.time} onChange={(e) => setPostData({ ...postData, time: e.target.value })} />
        <TextField name="details" variant="outlined" label="Details" fullWidth multiline rows={2} value={postData.details} onChange={(e) => setPostData({ ...postData, details: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;