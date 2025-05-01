import React from 'react';
import {
    Container, Button,Typography, TextField
  } from '@mui/material';

function ShowForms () {
    const [formtitle, setFormTitle] = React.useState('');
    
    const handleSubmitData = (event, value) => {  
      event.preventDefault();
      console.log(formtitle)
      setFormTitle('')
    }
    return(      
      <form onSubmit={handleSubmitData}>
      <Container maxWidth="sm" sx={{ padding: '10px', borderRadius: '5px', bgcolor: 'lightgray' }}>
         <Typography align="center" variant="h5" noWrap component="div" sx={{ color: 'text.primary'}}>{isEdit.length>0 ? 'Edit your property data' : 'Fill your property data'}</Typography>
          <TextField label='Title' value={formtitle} onChange={(e) => setFormTitle(e.target.value)} id='Title' required fullWidth sx={{ p:1}}></TextField>   
          {/* <TextField multiline fullWidth label='Description' value={isEdit.length>0 ? isEdit[2] : null} id='Description' sx={{ p:1}}></TextField>    
          <TextField required fullWidth label='Property Address' value={isEdit.length>0 ? isEdit[3] : null} id='Property Address' sx={{ p:1}}></TextField>   
          <TextField required fullWidth label='Locality' value={isEdit.length>0 ? isEdit[4] : null} id='Locality' sx={{ p:1}}></TextField> 
          <TextField required fullWidth label='City' value={isEdit.length>0 ? isEdit[5] : null} id='City' sx={{ p:1}}></TextField>   
          <TextField required fullWidth label='Owner Name' value={isEdit.length>0 ? isEdit[6] : null} id='Owner Name' sx={{ p:1}}></TextField> 
          <TextField required fullWidth label='Phone No' value={isEdit.length>0 ? isEdit[7] : null} id='Phone No' sx={{ p:1}}></TextField>   
          <TextField required fullWidth label='Rental Price' value={isEdit.length>0 ? isEdit[8] : null} id='Rental Price' sx={{ p:1}}></TextField>  */}
          <Button onClick={handleSubmitData} variant="contained" startIcon={<SendIcon />}>{isEdit.length>0 ? 'Submit Changes' : 'Submit Data'}</Button>
      </Container> </form>
    )
  } 