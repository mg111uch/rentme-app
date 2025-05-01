"use client";
import React from 'react';
import {
  Box, Container, Button, IconButton, Typography, Grid, Stack,
  Pagination, TextField, InputAdornment, AppBar, Toolbar, 
  Dialog, DialogActions, DialogContent, DialogTitle,
  Accordion, AccordionSummary, AccordionDetails, Menu, MenuItem,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function Home() {  
  const [allrows, setAllRows] = React.useState([]); 
  const [shownrows, setShownRows] = React.useState([]); 
  const [pagecount, setPagecount] = React.useState(null); 
  const [currentpage, setCurrentPage] = React.useState(1); 
  const [expanded, setExpanded] = React.useState('');    
  const [toEdit, setToEdit] = React.useState([]);
  const [showhome, setShowHome] = React.useState(true);
  const [showform, setShowForm] = React.useState(false); 
  const [showedit, setShowEdit] = React.useState(false); 
  const [loginStatus, setLogInStatus] = React.useState(false);
  const [userid, setUserID] = React.useState('default'); 
  const [enterId, setEnterID] = React.useState(''); 
  const [loginDialog, setLogInDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [anchorE4, setAnchorE4] = React.useState(null);
  const [anchorE5, setAnchorE5] = React.useState(null);

  const correctID = '123'
  const tableheader = ["id","Title","Description","Property Address",
    "Locality","City","Owner Name","Phone No",
    "Rental Price","Payment Status"]
  const formlength = {title:30,description:99,address:25,locality:15,
    city:12,ownername:20,phoneno:10,price:10}

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID
  const range = 'Sheet1!A:H'
  // const range = 'Form_Responses1!A:J'
  const rowsperpage = 5

  const text_small = 14
  const text_medium = 16
  const text_large = 18

  const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  React.useEffect(() => {
    async function fetchSheetData() {
      try {
        // const response = await fetch(API_URL);
        const response = await fetch("http://localhost:3000/api");  
        if (!response.ok) throw new Error('Failed to fetch data');
        const sheetdata = await response.json() 

        const sheetheaders = sheetdata.values.shift() // pops out first header element
        
        setAllRows(sheetdata.values) 
        setPagecount(Math.ceil(sheetdata.values.length/rowsperpage))
        setShownRows(sheetdata.values.slice((currentpage-1)*rowsperpage, (currentpage-1)*rowsperpage+rowsperpage))   
        setShowForm(false)
        setShowEdit(false)
      }catch (error) {        
          console.log(error.message);        
      }}    
    if(showhome){
      fetchSheetData() 
    }     
  },[showhome]) 

  async function fetchData(myCommand,myPayload){
    const response = await fetch("http://localhost:3000/api/1",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userID: 123,
        command: myCommand,
        payload: myPayload }),
    });  
    if (!response.ok) throw new Error('Failed to fetch data');
    const sheetdata = await response.json()
    return sheetdata
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#D9D9D9', // '#1976d2',
      },
    },
  });

  // ------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------

  const handleHomePage = (e) => { setShowHome(true); setShowForm(false); setShowEdit(false); setToEdit([]);console.log("Home clicked"); handleMenuClose1()}
  const handleMyForm = (e) => { setShowHome(false); setShowForm(true); setShowEdit(false); setLogInStatus(true); console.log("Form Showed"); handleMenuClose3()} 
  async function fetchOwnerData() {
    try {      
      const sheetdata = await fetchData('read', [])
      const sheetheaders = sheetdata.values.shift() // pops out first header element

      setAllRows(sheetdata.values) 
      setPagecount(Math.ceil(sheetdata.values.length/rowsperpage))
      setShownRows(sheetdata.values.slice((currentpage-1)*rowsperpage, (currentpage-1)*rowsperpage+rowsperpage))   
      setShowHome(false); setShowForm(false); setShowEdit(true); setToEdit([]);console.log("My Places clicked"); handleMenuClose4()
    }catch (error) {        
        console.log(error.message);        
    }
  }

  const handleDialogOpen = (e) => { setLogInDialog(true);console.log('Sign In Dialogue');handleMenuClose3();handleMenuClose5() }
  const handleFilter = (e) => { console.log("Filter clicked"); handleMenuClose2() }
  const handleLogOut = (e) => { setLogInStatus(false); handleHomePage(); console.log("Logged Out"); handleMenuClose5()  };

  const handleSignInButton = (e) => { 
    if(enterId == correctID){ console.log('Logged In');setUserID(enterId); handleMyForm()}
    else{ console.log('Wrong ID');  }
    setEnterID(''); setLogInDialog(false) }  

  const handleMenuOpen1 = (event) => {    setAnchorEl(event.currentTarget);  };
  const handleMenuClose1 = () => {    setAnchorEl(null);  };
  const handleMenuOpen2 = (event) => {    setAnchorE2(event.currentTarget);  };
  const handleMenuClose2 = () => {    setAnchorE2(null);  };
  const handleMenuOpen3 = (event) => {    setAnchorE3(event.currentTarget);  };
  const handleMenuClose3 = () => {    setAnchorE3(null);  };
  const handleMenuOpen4 = (event) => {    setAnchorE4(event.currentTarget);  };
  const handleMenuClose4 = () => {    setAnchorE4(null);  };
  const handleMenuOpen5 = (event) => {    setAnchorE5(event.currentTarget);  };
  const handleMenuClose5 = () => {    setAnchorE5(null);  };
  
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

  function DrawComponents () {
    const handlePanelChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };
    const handlePageChange = (event, value) => {
      setShownRows(allrows.slice((value-1)*rowsperpage, (value-1)*rowsperpage+rowsperpage)) 
      setCurrentPage(value);     
    };

    return(      
      <Container sx={{ mt: 0, p: 0}}>  
        <Accordion defaultExpanded key={tableheader[tableheader.indexOf('id')]} sx={{ bgcolor: '#A59D84' }}>
          <AccordionSummary expandIcon={<ArrowDropDownIcon />}>          
            <Grid container spacing={0} sx={{ width: '100%'}}>
              <Grid size={12} ><Typography component="span" sx={{  color: 'text.primary',fontSize: text_medium}}>{tableheader[tableheader.indexOf('Title')]}</Typography></Grid>
              <Grid size={7.5} ><Typography align="left" sx={{ color: 'text.secondary',fontWeight: 'bold', fontSize: text_small }}>{tableheader[tableheader.indexOf('Locality')]+', '+tableheader[tableheader.indexOf('City')]}</Typography></Grid>
              <Grid size={12-7.5} ><Typography inline="true" noWrap variant="body1" sx={{ color: 'text.primary',fontWeight: 'bold', fontSize: text_small }}>{tableheader[tableheader.indexOf('Rental Price')]}</Typography></Grid></Grid></AccordionSummary>
          <AccordionDetails >
            <Grid container spacing={0} sx={{ width: '100%'}}>
              <Grid size={12} ><Typography sx={{ color: 'text.primary', fontSize: text_small }}>{tableheader[tableheader.indexOf('Description')]}</Typography></Grid>
              <Grid size={12} ><Typography sx={{ color: 'text.secondary', fontSize: text_small }}>{tableheader[tableheader.indexOf('Property Address')]}</Typography></Grid>
              <Grid size={7} ><Typography sx={{ color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{tableheader[tableheader.indexOf('Owner Name')]}</Typography></Grid>
              <Grid size={12-7} ><Typography sx={{ color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{tableheader[tableheader.indexOf('Phone No')]}</Typography></Grid></Grid></AccordionDetails></Accordion>

        {shownrows.map((row) => (
          <Accordion key={row[tableheader.indexOf('id')]} expanded={expanded === 'panel'+row[tableheader.indexOf('id')]} onChange={handlePanelChange('panel'+row[tableheader.indexOf('id')])} sx={{ bgcolor: 'lightgray' }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
              <Grid container spacing={0} sx={{ width: '100%'}}>
                <Grid size={12} ><Typography component="span" sx={{ color: 'text.primary',fontSize: text_medium}}>{row[tableheader.indexOf('id')]+' : '+row[tableheader.indexOf('Title')]}</Typography></Grid>
                <Grid size={7.5} ><Typography align="left" sx={{ color: 'text.secondary',fontWeight: 'bold', fontSize: text_small }}>{row[tableheader.indexOf('Locality')]+', '+row[tableheader.indexOf('City')]}</Typography></Grid>
                <Grid size={12-7.5} ><Typography inline="true" noWrap variant="body1" sx={{ color: 'text.primary',fontWeight: 'bold', fontSize: text_small }}>{row[tableheader.indexOf('Rental Price')]}</Typography></Grid></Grid></AccordionSummary>  
            <AccordionDetails >
            <Grid container spacing={0} sx={{ width: '100%'}}>
              <Grid size={12} ><Typography sx={{ color: 'text.primary', fontSize: text_small }}>{row[tableheader.indexOf('Description')]}</Typography></Grid>
              <Grid size={12} ><Typography sx={{ color: 'text.secondary', fontSize: text_small }}>{row[tableheader.indexOf('Property Address')]}</Typography></Grid>
              <Grid size={7} ><Typography sx={{ color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{row[tableheader.indexOf('Owner Name')]}</Typography></Grid>
              <Grid size={12-7} ><Typography sx={{ color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{row[tableheader.indexOf('Phone No')]}</Typography></Grid></Grid>
              {showedit 
              ? <Stack direction="row" spacing={8} sx={{ justifyContent: 'center' }}>
                  <Button onClick={()=>{setToEdit(row);setShowEdit(false);setShowForm(true)}} variant="contained" startIcon={<EditIcon sx={{ color: "text.secondary" }}/>}  size="small">Update</Button>
                  <Button onClick={async()=>{await fetchData('delete',row)}} variant="contained" startIcon={<DeleteIcon sx={{ color: "error.light" }}/>}  size="small">Delete</Button></Stack>
              : null}</AccordionDetails></Accordion>
        ))}  
        <Container sx={{ bgcolor: 'darkgray' }}>           
          <Stack spacing={2} alignItems="center">
            <Pagination count={pagecount} page={currentpage} onChange={handlePageChange} variant="outlined" shape="rounded"></Pagination></Stack></Container>             
      </Container>            
    )
  }
  // ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
  function ShowForms () {
    const [id, setID] = React.useState(toEdit.length>0 ? toEdit[0] : '');
    const [title, setTitle] = React.useState(toEdit.length>0 ? toEdit[1] : '');
    const [description, setDescription] = React.useState(toEdit.length>0 ? toEdit[2] : '');
    const [address, setAddress] = React.useState(toEdit.length>0 ? toEdit[3] : '');
    const [locality, setLocality] = React.useState(toEdit.length>0 ? toEdit[4] : '');
    const [city, setCity] = React.useState(toEdit.length>0 ? toEdit[5] : '');
    const [ownername, setOwnerName] = React.useState(toEdit.length>0 ? toEdit[6] : '');
    const [phoneno, setPhoneNo] = React.useState(toEdit.length>0 ? toEdit[7] : '');
    const [price, setPrice] = React.useState(toEdit.length>0 ? toEdit[8] : '');
    const [payment, setPayment] = React.useState(toEdit.length>0 ? toEdit[9] : '');

    const handleSubmitData = async (event, value) => {  
      event.preventDefault();
      const newData = [id,title,description,address,locality,city,ownername,phoneno,price,payment,userid]
      console.log(newData)
      if(toEdit.length>0){
        const sheetdata = await fetchData('update',newData)
        setToEdit([])
      }else{
        const sheetdata = await fetchData('create',newData)
      }      
    }
    return(      
      <form onSubmit={handleSubmitData} >
      <Container maxWidth="sm" sx={{ p:2, borderRadius: '2px', bgcolor: 'lightgray' }}>
         <Typography align="center" variant="h5" sx={{ color: 'text.primary', fontSize: text_large}}>{toEdit.length>0 ? 'Edit your property details' : 'Fill your property details'}</Typography>
          <TextField fullWidth sx={{ mb:1 }} variant="standard" size="small" id='Title' 
          label='Title' 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}                  
          slotProps={{ 
            htmlInput: { maxLength: formlength.title }, 
            input: { 
              endAdornment:<InputAdornment position="end">{title.length} / {formlength.title}</InputAdornment> 
            }
          }}></TextField>   
          <TextField variant="standard" label='Description and Facilities' value={description} onChange={(e) => setDescription(e.target.value)} id='Description' multiline sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.description }, input: { endAdornment:<InputAdornment position="end">{description.length} / {formlength.description}</InputAdornment> }}}></TextField>    
          <TextField variant="standard" label='Property Address' value={address} onChange={(e) => setAddress(e.target.value)} id='Property Address' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.address }, input: { endAdornment:<InputAdornment position="end">{address.length} / {formlength.address}</InputAdornment> }}}></TextField>   
          <TextField variant="standard" label='Locality' value={locality} onChange={(e) => setLocality(e.target.value)} id='Locality' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.locality }, input: { endAdornment:<InputAdornment position="end">{locality.length} / {formlength.locality}</InputAdornment> }}}></TextField> 
          <TextField variant="standard" label='City' value={city} onChange={(e) => setCity(e.target.value)} id='City' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.city }, input: { endAdornment:<InputAdornment position="end">{city.length} / {formlength.city}</InputAdornment> }}}></TextField>   
          <TextField variant="standard" label='Owner Name' value={ownername} onChange={(e) => setOwnerName(e.target.value)} id='Owner Name' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.ownername }, input: { endAdornment:<InputAdornment position="end">{ownername.length} / {formlength.ownername}</InputAdornment> }}}></TextField> 
          <TextField variant="standard" label='Phone No' value={phoneno} onChange={(e) => setPhoneNo(e.target.value)} id='Phone No' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.phoneno }, input: { endAdornment:<InputAdornment position="end">{phoneno.length} / {formlength.phoneno}</InputAdornment> }}}></TextField>   
          <TextField variant="standard" label='Rental Price in Rs' value={price} onChange={(e) => setPrice(e.target.value)} id='Rental Price' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.price }, input: { endAdornment:<InputAdornment position="end">{price.length} / {formlength.price}</InputAdornment> }}}></TextField> 
          {/* <Typography align="center" variant="h5" sx={{ color: 'text.primary', fontSize: text_small}}>Payment : {payment}, ToEdit : {toEdit.length}</Typography> */}
          <Button onClick={handleSubmitData} variant="contained" startIcon={<SendIcon />} size="small" sx={{ mt:1 }}>{toEdit.length>0 ? 'Submit Changes' : 'Submit Data'}</Button>
      </Container> 
      </form>
    )
  }   
  // ------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------
  return (
    <div>
      <Box sx={{ width: '100%'}}><ThemeProvider theme={darkTheme}>
        <AppBar position="static" color="primary" >
          <Toolbar>            
            <IconButton size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>🚀</IconButton>
            <Typography noWrap align="center" variant="h6" sx={{ mt:0.5 }}>Rent Me</Typography>
            <Stack direction="row" spacing={0.5} sx={{ marginLeft: 'auto' }}>
              { !showhome 
                ? <IconButton onClick={handleMenuOpen1} aria-label="home" aria-controls="menu-appbar1" aria-haspopup="true" size="small"><HomeIcon /></IconButton> 
                : <IconButton onClick={handleMenuOpen2} aria-label="filter" aria-controls="menu-appbar2" aria-haspopup="true" size="small"><FilterAltIcon /></IconButton>}
              { !showform 
                ? <IconButton onClick={handleMenuOpen3} aria-label="form" aria-controls="menu-appbar3" aria-haspopup="true" size="small"><AddIcon /></IconButton> 
                : null}
              { loginStatus && !showedit  
                ? <IconButton onClick={handleMenuOpen4} aria-label="fetch" aria-controls="menu-appbar4" aria-haspopup="true" size="small"><DensityMediumIcon /></IconButton> 
                : null}
              { loginStatus 
                ? <IconButton onClick={handleMenuOpen5} aria-label="login" aria-controls="menu-appbar5" aria-haspopup="true" size="small"><AccountCircleIcon /></IconButton>
                : null}
            </Stack></Toolbar></AppBar></ThemeProvider>
      </Box>

      <Menu open={Boolean(anchorEl)} onClose={handleMenuClose1}  id="menu-appbar1" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={handleHomePage} sx={{ bgcolor: '#D9D9D9' }}>Home Page</MenuItem></Menu>
      <Menu open={Boolean(anchorE2)} onClose={handleMenuClose2}  id="menu-appbar2" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={handleFilter} sx={{ bgcolor: '#D9D9D9' }}>Filter Results</MenuItem></Menu>
      <Menu open={Boolean(anchorE3)} onClose={handleMenuClose3}  id="menu-appbar3" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={loginStatus ? handleMyForm : handleDialogOpen} sx={{ bgcolor: '#D9D9D9' }}>Add Place</MenuItem></Menu>
      <Menu open={Boolean(anchorE4)} onClose={handleMenuClose4}  id="menu-appbar4" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={fetchOwnerData} sx={{ bgcolor: '#D9D9D9' }}>My Places</MenuItem></Menu>
      <Menu open={Boolean(anchorE5)} onClose={handleMenuClose5}  id="menu-appbar5" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={handleLogOut} sx={{ bgcolor: '#D9D9D9' }}>Log Out</MenuItem></Menu>
      
      <Dialog open={loginDialog} onClose={()=>{console.log("Close Dialog")}}>
        <DialogTitle>Please Sign In to continue</DialogTitle>
        <DialogContent>
          <Typography align="center" >UserId is 123</Typography>
          <TextField required onChange={(e) => setEnterID(e.target.value)} id="text1" label="User Id" variant="standard" size="small"></TextField></DialogContent>
        <DialogActions>
        <Button onClick={handleSignInButton} variant="contained" size="small">Sign In</Button></DialogActions></Dialog>

      {  loginStatus ? <Typography align="center" sx={{ fontSize: text_large }}>Hii, {userid}.</Typography> : null}
      {  showhome ? (shownrows.length>0 ? <DrawComponents ></DrawComponents> : null) : null}
      {  showform ? <div align="center"><ShowForms></ShowForms></div> : null}
      {  showedit ? (shownrows.length>0 ? <DrawComponents ></DrawComponents> : null) : null}             
    </div>
  );
}
