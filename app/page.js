"use client";
import React from 'react';
import {
  Box,   Container, Button, IconButton, Typography, Grid, Stack,
  TextField, InputAdornment, AppBar, Toolbar, Paper,
  Dialog, DialogActions, DialogContent, DialogTitle, Divider,
  Menu, MenuItem, List, ListItem, ListItemButton, ListItemIcon,
  Snackbar, Backdrop, CircularProgress, Checkbox, Rating,
  InputLabel, FormControl, Select,  FormControlLabel,
   BottomNavigation, BottomNavigationAction
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import SyncIcon from '@mui/icons-material/Sync';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const defaultuserid = 'As Guest User'
const rowsperpage = 20

const tableheader = ['Timestamp',"Title","Description","Property Address",
  "Locality","City","Owner Name","Phone No",
  "Rental Price","Like Status","Type"]
const categories = ['Flat','Hostel','Villa','Shop','Factory']
const formlength = {title:30,description:70,address:30,locality:15,
  city:12,ownername:25,phoneno:10,price:10,password:20,feedback:280}  
const featureslist = [
  'Free to use service for all Indian rental place seekers.',
  'Owners must provide login name and phone as on your Aadhar Card for Address proof.',
  'Do not repeat information in Description that you have already mentioned in the Title.',
  'Only 3 places can be listed by a owner in free tier service. Paid plan with more limits launching soon.',
  'New Posts may take upto one hour to show up on homepage due to low budget.',
  'List can be refreshed with an interval of 15 minutes.',
  'Reload resets the like sign but they are saved in favourites.',
  'Contact us to run your business ads on this page. (Nominal charges)'
]

const text_small = 14
const text_medium = 16
const text_large = 18
const opacity = '00'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D9D9D9', // '#1976d2',
    },
  },
});

export default function Home() {  
  const [ownername, setOwnerName] = React.useState('');
  const [phoneno, setPhoneNo] = React.useState('');
  const [homerows, setHomeRows] = React.useState([]); 
  const [totalhomerows, setTotalHomeRows] = React.useState(0);
  const [userrows, setUserRows] = React.useState([]); 
  const [totaluserrows, setTotalUserRows] = React.useState(0); 
  const [filterrows, setFilterRows] = React.useState([]); 
  const [totalfilterrows, setTotalFilterRows] = React.useState(0); 
  const [favrows, setFavRows] = React.useState([]); 
  const [fetchrows, setFetchRows] = React.useState(false);  
  const [endlist, setEndList] = React.useState(false);   
  const [toEdit, setToEdit] = React.useState([]);
  const [showhome, setShowHome] = React.useState(true);
  const [showform, setShowForm] = React.useState(false); 
  const [showuser, setShowUser] = React.useState(false); 
  const [showfilterform, setShowFilterform] = React.useState(false); 
  const [showfilter, setShowFilter] = React.useState(false); 
  const [showfav, setShowFav] = React.useState(false); 
  const [showrating, setShowRating] = React.useState(false); 
  const [showfeatures, setShowFeatures] = React.useState(false);
  const [filterheaders, setFilterHeaders] = React.useState([]); 
  const [entername, setEnterName] = React.useState(''); 
  const [enterphone, setEnterPhone] = React.useState(''); 
  const [password, setPassword] = React.useState('');
  const [checked, setChecked] = React.useState(false);
  const [dialogPage, setDialogPage] = React.useState(1);
  const [loginStatus, setLogInStatus] = React.useState(false);  
  const [newuser, setNewUser] = React.useState(true);     
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [signInloading, setSignInLoading] = React.useState(false);
  const [morerowsloading, setMoreRowsLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [anchorE3, setAnchorE3] = React.useState(null);
  const [anchorE4, setAnchorE4] = React.useState(null);
  const [anchorE5, setAnchorE5] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState('');
  const [progress, setProgress] = React.useState(false);
  const [navigation, setNavigation] = React.useState(3);
  const [homereload, setHomeReload] = React.useState(false);
  const [userreload, setUserReload] = React.useState(false);
  const [homereloadtime, setHomeReloadTime] = React.useState(Date.now());
  const [userreloadtime, setUserReloadTime] = React.useState(Date.now());
  const [rating, setRating] = React.useState(5); 
  const [feedback, setFeedback] = React.useState(''); 
  
  const APP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL
  // const APP_URL = process.env.NEXT_PUBLIC_LOCAL_URL

  async function accessAPI(jsonData){
    setProgress(true)
    console.log(jsonData)
    var response = null
    try {
      response = await fetch(APP_URL,{
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },   // Removing it solves fetching from Appscript
        body: JSON.stringify(jsonData)
      });  
      if (!response.ok) throw new Error('Failed to fetch data');
    }catch (error) {        
        console.log(error.message);        
    }
    const sheetdata = await response.json()
    console.log(sheetdata)
    setProgress(false)
    return sheetdata.values
  }
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  function postedDaysAgo(timestamp){      
    const daysago = (Date.now() - Number(timestamp)) / 86400000
    if(daysago < 1){
      return Math.ceil(daysago*24)+'h'
    }else{
      return Math.ceil(daysago)+'d'
    }      
  }
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
  function handleSignIn () {    
    async function verifyLoginAuth() {
      if(  /^[a-zA-Z\s]*$/.test(entername)  ){
        if(  Number.isInteger(Number(enterphone))  ){
          if(enterphone.length == 10){                
            const response = await accessAPI({ 
              command: 'auth',
              payload: { enterName: entername,enterPhone: enterphone,password:password,newUser:newuser}
            })          
            if(response[0] == 'Verified'){ 
              if(checked){
                localStorage.setItem('UserLogInCredentials',JSON.stringify({ownername:`${entername}`,phoneno:`${enterphone}`,password:`${password}`}))
              }
              setSnackbar('Log In Success !!');setOwnerName(entername);setPhoneNo(enterphone)
              setDialogOpen(false);setDialogPage(1); setEnterName('');setEnterPhone('');handleMyForm()
            }else if(response[0] == 'User Account Added'){
              setSnackbar('Account created..Login as Existing User !!');
              setDialogPage(1);setNewUser(false);setEnterName('');setEnterPhone('')
            }else if(response[0] == 'User Already exists'){
              setSnackbar('User Already exists !!');
            }else{  
              setSnackbar('Wrong credentials..Login Failed !!')  
            }
          }else{setSnackbar('Entered Phone is not 10 digits !!')}
        }else{  setSnackbar('Entered Phone is not a Number !!')  } 
      }else{  setSnackbar('Entered Name should not contain numbers !!')  } 
      setSignInLoading(false); 
    } 
    if (!signInloading) {
      setSignInLoading(true);
      verifyLoginAuth()   
    }     
  }  
  const handleHomePage = async (e) => {   
    handleMenuClose1() ; setNavigation(3)  
    setShowForm(false); setShowUser(false); setShowFilterform(false); setShowFilter(false)
    setShowRating(false); setShowFav(false); setShowFeatures(false); 
    if (homerows.length==0 || homereload){
      // console.log('Fetching Home rows from DB')        
      var rowdata = await accessAPI({ command: 'read', payload: { currentrow: 0 , filterby:'', range:'' } })     
      // console.log('Setting Local storage for Home rows')
      localStorage.setItem('RentMe:HomeRows',JSON.stringify(rowdata))
      setTotalHomeRows(rowdata.pop())
      if(rowdata.length > rowsperpage){
        // console.log('Slicing rowData'); 
        setHomeRows(rowdata.slice(0,rowsperpage))
      }else{ setHomeRows(rowdata) }  
      if(homereload){setHomeReloadTime(Date.now()); setHomeReload(false)}           
    }
    setToEdit([]); setShowHome(true);     
  }
  const handleMyForm = (e) => { 
    handleMenuClose3(); setLogInStatus(true); setNavigation(3) 
    setShowHome(false); setShowUser(false); setShowFilterform(false); setShowFilter(false)
    setShowRating(false); setShowFav(false); setShowFeatures(false);    
    setShowForm(true); 
  }    
  const handleUserPage = async (e) => {
    handleMenuClose4(); setNavigation(3);
    setShowHome(false); setShowForm(false); setShowFilterform(false); setShowFilter(false)
    setShowRating(false); setShowFav(false); setShowFeatures(false); 
    setShowUser(true); 
    if(userrows.length == 0 || userreload){
      var rowdata = await accessAPI({ 
        command: 'read', payload: {currentrow:0,
          filterby:{ ownername: ownername },range:'' } } )     
      if(rowdata.length != 0){ setTotalUserRows(rowdata.pop()); setUserRows(rowdata)} 
      else{ setSnackbar('No listed Places..!!') }
      if(userreload){  setUserReloadTime(Date.now()); setUserReload(false)} 
    }       
    setToEdit([]);
  }
  const handleFilter = (e) => { 
    handleMenuClose2();setNavigation(3);      
    setShowHome(false);setShowForm(false);setShowUser(false); setShowFilter(false)
    setShowFav(false); setShowFav(false); setShowFeatures(false);  
    setShowFilterform(true);     
  }
  const handleRating = (e) => {  
    setRating(5); setFeedback('');
    setShowHome(false);setShowForm(false);setShowUser(false); setShowFilterform(false); setShowFilter(false)
    setShowFav(false); setShowFeatures(false); setShowRating(true)
  }
  const handleFavorites = (e) => {    
    var currentValues = localStorage.getItem('RentMe:Favorites:Values'); 
    if(currentValues){
      const rowsarray = JSON.parse('[' + currentValues + ']')
      setFavRows(rowsarray);
    }
    setShowHome(false); setShowForm(false); setShowUser(false); setShowFilterform(false); setShowFilter(false)
    setShowRating(false);setShowFeatures(false);setShowFav(true)
  }   
  const handleFeatures = (e) => {  
    setShowHome(false); setShowForm(false); setShowUser(false); setShowFilterform(false); setShowFilter(false)
    setShowRating(false);setShowFav(false);setShowFeatures(true);
  }
  const handleFeedbackSubmit = async(e) => {
    const response = await accessAPI({ 
      command: 'feedback',
      payload: { ownername: ownername,phoneno: phoneno,rating:rating,feedback:feedback}
    })
    setSnackbar('Thanks You..!!')
  }
  const handleRemoveFilters = (e) => { setShowFilter(false); setShowHome(true); setFilterHeaders([]) ;setSnackbar('Filters removed..!!')}
  const handleDialogOpen = (e) => { handleMenuClose3();handleMenuClose5() ; setDialogOpen(true);}
  const handleLogOut = (e) => { 
    handleMenuClose5(); setLogInStatus(false);setOwnerName(defaultuserid); 
    handleHomePage();setUserRows([]); setSnackbar('Logged Out..!!');   
    localStorage.removeItem('UserLogInCredentials')
  };  

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
  React.useEffect(() => {   
    const UserLogInCredentials = localStorage.getItem('UserLogInCredentials') 
    // console.log(UserLogInCredentials)
    if(UserLogInCredentials){
      const UserJson = JSON.parse(UserLogInCredentials)
      setOwnerName(UserJson.ownername); setPhoneNo(UserJson.phoneno)
      setLogInStatus(true)
    }
    handleHomePage()        
  },[]) 

  function DrawComponents ({rows}) {   
    const handleShowMoreRows = (event, value) => {
      async function loadMoreRows() {        
        const rowDatajson = localStorage.getItem('RentMe:HomeRows')   
        const localrowData = JSON.parse(rowDatajson) 
        setTotalHomeRows(localrowData.pop())
        if(!fetchrows){          
          if(localrowData.length > homerows.length + rowsperpage){
            setHomeRows([...rows, ...localrowData.slice(homerows.length,homerows.length+rowsperpage)])
          }else{
            const lastlocalrows = [...homerows, ...localrowData.slice(homerows.length,localrowData.length)]
            setHomeRows(lastlocalrows)            
            if(lastlocalrows.length == totalhomerows){setEndList(true)}
            else{setFetchRows(true)}
          }
        }else{
          console.log('Fetched more rows'); 
          setMoreRowsLoading(true)          
          const morerows = await accessAPI({command: 'read',
            payload: {currentrow: homerows.length ,filterby:'', range:'' }})
          const newlocalrows = [...localrowData, ...morerows]         
          localStorage.setItem('RentMe:HomeRows',JSON.stringify(newlocalrows))          
          if(localrowData.length + morerows.length > homerows.length + rowsperpage){            
            setHomeRows([...rows, ...newlocalrows.slice(homerows.length,homerows.length+rowsperpage)])
          }else{
            setHomeRows([...rows, ...newlocalrows.slice(homerows.length,morerows.length)])
          }
          setFetchRows(false); setMoreRowsLoading(false)
        }        
      } 
      loadMoreRows()      
    };
    const handleUpdateRow = async(row) =>{
      setToEdit(row);setShowUser(false);setShowForm(true)
    }
    const handleDeleteRow = async(row) =>{     
      const response = await accessAPI({command:'delete', payload:{ toDeleteID: row[0] }})
      if(response[0] == 'Data deleted.'){
        const rowsuser = userrows.filter((i) => i[0] !== row[0])
        setUserRows(rowsuser);
        setTotalUserRows(rowsuser.length)
        setSnackbar('Entry deleted !!')
      }else{
        setSnackbar('Error deleting this place !!')
      }
    }
    const handleReload = (e) => {       
      if(showhome && (Date.now() - homereloadtime)/1000 > 15*60){ setHomeReload(true); handleHomePage() }
      else{setSnackbar(`After ${16 - Math.ceil((Date.now() - homereloadtime)/(60*1000))} minutes`)}
      if(showuser && (Date.now() - userreloadtime)/1000 > 15*60){ setUserReload(true); handleUserPage() } 
      else{setSnackbar(`After ${16 - Math.ceil((Date.now() - userreloadtime)/(60*1000))} minutes`)}
    } 
    const handleLike = (row,index) => {
      const newStamp = row[0]      
      var currentValues = localStorage.getItem('RentMe:Favorites:Values');     
      if(!currentValues){  currentValues = ''   }
      if(!currentValues.includes(newStamp)){        
        if((JSON.parse('[' + currentValues + ']').length) < 25){
          const newValue = JSON.stringify(row)
          const updatedValue = currentValues ? `${currentValues},${newValue}` : newValue; 
          localStorage.setItem('RentMe:Favorites:Values', updatedValue);
        }else{setSnackbar('Favorites List full')}
      }else{setSnackbar('Already in Favorites')}   
    }
    const handleDeleteFavorite = (row) => {
      setFavRows((prev) => [...prev.filter((i) => i[0] !== row[0])]);
      const currentValues = localStorage.getItem('RentMe:Favorites:Values'); 
      var rowsarray = JSON.parse('[' + currentValues + ']')
      rowsarray = rowsarray.filter((i) => i[0] !== row[0])   
      const jsonRowsArray = JSON.stringify(rowsarray)  
      const bracketsRemovedString = jsonRowsArray.slice(1,-1);
      localStorage.setItem('RentMe:Favorites:Values', bracketsRemovedString);
    }
    return(      
      <Container sx={{ mt: 0, p: 0}}>  
        <List>
          <ListItem key={generateRandomString(8)} sx={{ bgcolor: '#A59D84' }}>
            <Grid container spacing={0} sx={{  bgcolor: '#1976D2'+opacity, width: '100%'}}>
              <Grid size={2} ><Typography component="span" sx={{ bgcolor: '#D89A84'+opacity, color: 'text.primary',fontSize: text_medium,fontWeight: 'bold'}}>{showfilterform ? Filters : tableheader[tableheader.indexOf('Title')]}</Typography></Grid>
              <Grid size={9} ><Box align='center'><Typography component="span" sx={{ bgcolor: '#D89A84'+opacity, color: 'text.primary',fontSize: text_small}}>Total {showhome ? totalhomerows : showuser ? totaluserrows : showfilter ? totalfilterrows : showfav ? favrows.length : null} places</Typography></Box></Grid>
              <Grid size={12-11} ><IconButton sx={{p:0,bgcolor: '#A59D84',}} color='inherit' aria-label="refresh" onClick={showfilter ? handleRemoveFilters : (showhome || showuser) ? handleReload : ()=>{}} size="small">{showfilter ? <CloseIcon /> : (showhome || showuser) ? <SyncIcon /> : null}</IconButton></Grid>
              { showfilter ? (filterheaders.map((header) => (
                <Grid size={12} key={generateRandomString(8)} ><Typography component="span" sx={{ bgcolor: '#D89A84'+opacity, color: 'text.primary',fontSize: text_small}}>{header}</Typography></Grid>
              ))) : <>
              <Grid size={8} ><Typography sx={{bgcolor: '#D89A84'+opacity, color: 'text.secondary', fontSize: text_small }}>{tableheader[tableheader.indexOf('Description')]}</Typography></Grid>
              <Grid size={12-8} >{showhome ? <Typography align="right" sx={{bgcolor: '#D89A84'+opacity, color: 'text.secondary', fontSize: text_small }}>Refresh</Typography> 
                                : showuser ? <Typography align="right" sx={{bgcolor: '#D89A84'+opacity, color: 'text.secondary', fontSize: text_small }}>UPDATE</Typography> : null}</Grid>
              <Grid size={9} ><Typography sx={{ bgcolor: '#D89A84'+opacity,color: 'text.primary', fontSize: text_small }}>{tableheader[tableheader.indexOf('Property Address')]}</Typography></Grid>
              <Grid size={12-9} >{showhome ? <Stack direction='row' spacing={1} sx={{justifyContent:'right'}}>
                                                <Typography sx={{ bgcolor: '#D89A84'+opacity,color: 'text.secondary',fontSize: text_small,fontWeight: 'bold'}}>Type</Typography>
                                                <Typography sx={{ bgcolor: '#D89A84'+opacity,color: 'text.secondary',fontSize: text_small}}>Time</Typography></Stack> 
                                            : <Typography align="right" sx={{ bgcolor: '#D89A84'+opacity,color: 'text.secondary', fontSize: text_small }}>DELETE</Typography>}</Grid>
              <Grid size={8} ><Typography align="left" sx={{ bgcolor: '#D89A84'+opacity,color: 'text.primary', fontSize: text_small }}>{tableheader[tableheader.indexOf('Locality')]+', '+tableheader[tableheader.indexOf('City')]}</Typography></Grid>
              <Grid size={12-8} ><Typography align="right" inline="true" noWrap variant="body1" sx={{ bgcolor: '#D89A84'+opacity, ml:1, color: 'text.primary',fontWeight: 'bold', fontSize: text_small }}>{tableheader[tableheader.indexOf('Rental Price')]}</Typography></Grid>
              <Grid size={8.4} ><Typography sx={{ bgcolor: '#D89A84'+opacity,color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{tableheader[tableheader.indexOf('Owner Name')]}</Typography></Grid>
              <Grid size={12-8.4} ><Typography align="right" noWrap sx={{  bgcolor: '#D89A84'+opacity, ml:1, color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{tableheader[tableheader.indexOf('Phone No')]}</Typography></Grid></>}
            </Grid>
          </ListItem>
        {rows.map((row,index) => (
            <ListItem disablePadding key={generateRandomString(8)} sx={{ bgcolor: 'lightgray' }}>
              <ListItemButton sx={{pb:0}}> 
                <Grid container spacing={0} sx={{ bgcolor: '#1976D2'+opacity, width: '100%'}}>
                  <Grid size={showuser ? 10 : 11} ><Typography noWrap component="span" sx={{ bgcolor: '#D89A84'+opacity,color: 'text.primary',fontSize: text_medium}}>{row[tableheader.indexOf('Title')]}</Typography></Grid>
                  <Grid size={showuser ? 2 : 1} >{showhome ? <Checkbox onChange={()=>{handleLike(row,index)}} sx={{ p:0}} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:'#ff6d75'}}/>} />
                                              : showuser ? <Stack direction='row' spacing={1} sx={{justifyContent:'right'}}>
                                                <IconButton onClick={()=>{handleUpdateRow(row)}} sx={{p:0,bgcolor: 'lightgray'}} color='inherit' aria-label="refresh" size="small"><EditIcon sx={{ color: "text.secondary" }}/></IconButton>
                                                <IconButton onClick={()=>{handleDeleteRow(row)}} sx={{p:0,bgcolor: 'lightgray'}} color='inherit' aria-label="refresh" size="small"><DeleteIcon sx={{ color: "text.secondary" }}/></IconButton></Stack>
                                              : showfav ? <IconButton onClick={()=>{handleDeleteFavorite(row)}} sx={{p:0,bgcolor: 'lightgray'}} color='inherit' aria-label="refresh" size="small"><DeleteIcon sx={{ color: "text.secondary" }}/></IconButton>
                                              : null}</Grid>
                  <Grid size={12} ><Typography sx={{ bgcolor: '#D89A84'+opacity,color: 'text.secondary', fontSize: text_small }}>{row[tableheader.indexOf('Description')]}</Typography></Grid>
                  <Grid size={11} ><Typography sx={{ bgcolor: '#D89A84'+opacity,color: 'text.primary', fontSize: text_small }}>{row[tableheader.indexOf('Property Address')]}</Typography></Grid> 
                  <Grid size={12-11} ><Stack direction='row' spacing={1} sx={{justifyContent:'right'}}>
                                        <Typography align='right' sx={{ mr:1, bgcolor: '#D89A84'+opacity,color: 'text.secondary',fontSize: text_small,fontWeight: 'bold'}}>{row[tableheader.indexOf('Type')]}</Typography> 
                                        <Typography align='right' sx={{ mr:1, bgcolor: '#D89A84'+opacity,color: 'text.secondary',fontSize: text_small}}>{postedDaysAgo(row[tableheader.indexOf('Timestamp')])}</Typography> </Stack></Grid>
                  <Grid size={9} ><Typography noWrap align="left" sx={{ bgcolor: '#D89A84'+opacity,color: 'text.primary', fontSize: text_small }}>{row[tableheader.indexOf('Locality')]+', '+row[tableheader.indexOf('City')]}</Typography></Grid>
                  <Grid size={12-9} ><Typography align="right" inline="true" noWrap variant="body1" sx={{ bgcolor: '#D89A84'+opacity, ml:1, color: 'text.primary',fontWeight: 'bold', fontSize: text_small }}>{row[tableheader.indexOf('Rental Price')]+' Rs'}</Typography></Grid>
                  <Grid size={8.4} ><Typography noWrap sx={{ bgcolor: '#D89A84'+opacity,color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{row[tableheader.indexOf('Owner Name')]}</Typography></Grid>
                  <Grid size={12-8.4} ><Typography align="right" sx={{ bgcolor: '#D89A84'+opacity, ml:1, color: 'text.secondary', fontSize: text_small ,fontWeight: 'bold'}}>{row[tableheader.indexOf('Phone No')]}</Typography></Grid>
                  <Divider sx={{pt:0.5,width: '100%'}}/></Grid></ListItemButton></ListItem>
        ))}          
          {showhome && !endlist && homerows.length != 0
          ? <ListItem disablePadding key={generateRandomString(8)} sx={{ bgcolor: 'lightgray', justifyContent:'center'}}>  
              <Button loading={morerowsloading} onClick={handleShowMoreRows} variant="text" size="small" color='primary'>Show more</Button></ListItem>   
          : null}
        </List></Container>            
    )
  }
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
  function ShowForms () {
    const [timestamp, setTimestamp] = React.useState(toEdit.length>0 ? toEdit[0] : '');
    const [title, setTitle] = React.useState(toEdit.length>0 ? toEdit[1] : '');
    const [description, setDescription] = React.useState(toEdit.length>0 ? toEdit[2] : '');
    const [address, setAddress] = React.useState(toEdit.length>0 ? toEdit[3] : '');
    const [locality, setLocality] = React.useState(toEdit.length>0 ? toEdit[4] : '');
    const [city, setCity] = React.useState(toEdit.length>0 ? toEdit[5] : '');  
    const [price, setPrice] = React.useState(toEdit.length>0 ? toEdit[8] : '');
    const [type, setType] = React.useState(toEdit.length>0 ? toEdit[10] : '');      
    const [pricefrom, setPriceFrom] = React.useState(''); 
    const [priceto, setPriceTo] = React.useState(''); 

    const handleSubmitData = async (event, value) => {  
      event.preventDefault();
      const rowData = [title,description,address,locality,city,ownername,phoneno,price,0,type]
      if(rowData.includes('')){setSnackbar('Form has empty values..!!')}
      else{
        if(toEdit.length>0){          
          const updateData = [timestamp, ...rowData]
          const response = await accessAPI({command:'update',payload:{ toUpdate: updateData } })
          if(response[0] == 'Values updated.'){  
            var rowsuser = userrows.filter((i) => i[0] !== toEdit[0])  
            rowsuser.push(updateData)        
            setUserRows(rowsuser)
            setTotalUserRows(rowsuser.length)
            setToEdit([]);setSnackbar('Successfully Updated !!');
          }else{setSnackbar('Error Updating Items !!')}
        }else{
          if(totaluserrows < 3){
            const newData = [Date.now(), ...rowData]
            const response =  await accessAPI({command:'create',payload:{ toCreate: newData } })
            if(response[0] == 'Data created.'){
              const rowsuser = [...userrows, newData ]            
              setUserRows(rowsuser)
              setTotalUserRows(rowsuser.length)
              setSnackbar('Successfully Created !!');
            }else{setSnackbar('Error Creating Items !!')}
          }else{setSnackbar('Maximum 3 listed places..!!')}
        } 
      }      
    }
    const handleApplyFilter = async (event, value) => {  
      event.preventDefault();
      if(totalhomerows > 2){
        const filterArray = [locality,city,type,pricefrom,priceto]
        const filterHeaderNames = ['Locality : ','City : ','Type : ','Price from : ','Price to : ']
        const isNonEmptyValue = filterArray.some( item => item != '' )
        if(isNonEmptyValue){
          // console.log(filterArray)
          setShowFilterform(false); setShowFilter(true);
          var filterTableHeader = []
          for(let i=0; i<filterArray.length; i++){
            if(filterArray[i] != ''){
              filterTableHeader.push(filterHeaderNames[filterArray.indexOf(filterArray[i])]+filterArray[i])
            }
          }
          // console.log(filterTableHeader)
          setFilterHeaders(filterTableHeader)
          var filterdata = await accessAPI({ 
            command: 'read',
            payload: {currentrow:0, filterby:{ locality:locality, city:city, type:type },
              range:{pricefrom:pricefrom, priceto:priceto} } } )
          setTotalFilterRows(filterdata.pop()); setFilterRows(filterdata)         
        } else{     setSnackbar('Please select some filters..!!') }     
      }else{    setSnackbar('After 100 listed places !!'); }   
    }
    return(      
      <Container maxWidth="sm" sx={{ p:2,mt:1, borderRadius: '2px', bgcolor: 'lightgray' }}>
        <Typography align="center" variant="h5" sx={{ mb:1,color: 'text.primary', fontSize: text_large}}>{showfilterform ? 'Set Filters (One or more)' : 'Fill your property details'}</Typography>
          <FormControl fullWidth sx={{ mt: 1 }} size='small'>
            <InputLabel >
              <Typography align="center" sx={{ color: 'text.secondary', fontSize: text_medium}}>Type</Typography></InputLabel>
              <Select value={type} label="Type" onChange={(e) => setType(e.target.value)} >
                {categories.map(item=>(<MenuItem sx={{ bgcolor:'lightgray'}} value={item}>{item}</MenuItem>))}
                </Select></FormControl>
          {showform ? <TextField fullWidth sx={{ mb:1 }} variant="standard" size="small" id='Title' label='Title' value={title} onChange={(e) => setTitle(e.target.value)} slotProps={{htmlInput: { maxLength: formlength.title },input: { endAdornment:<InputAdornment position="end">{title.length} / {formlength.title}</InputAdornment> }}}></TextField> : null}
          {showform ? <TextField variant="standard" label='Description and Facilities' value={description} onChange={(e) => setDescription(e.target.value)} id='Description' multiline sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.description }, input: { endAdornment:<InputAdornment position="end">{description.length} / {formlength.description}</InputAdornment> }}}></TextField> : null}
          {showform ? <TextField variant="standard" label='Property Address' value={address} onChange={(e) => setAddress(e.target.value)} id='Property Address' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.address }, input: { endAdornment:<InputAdornment position="end">{address.length} / {formlength.address}</InputAdornment> }}}></TextField> : null}  
          <TextField variant="standard" label='Locality' value={locality} onChange={(e) => setLocality(e.target.value)} id='Locality' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.locality }, input: { endAdornment:<InputAdornment position="end">{locality.length} / {formlength.locality}</InputAdornment> }}}></TextField> 
          <TextField variant="standard" label='City' value={city} onChange={(e) => setCity(e.target.value)} id='City' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.city }, input: { endAdornment:<InputAdornment position="end">{city.length} / {formlength.city}</InputAdornment> }}}></TextField>   
          {showform ? <TextField variant="standard" label='Rental Price in Rs' value={price} onChange={(e) => setPrice(e.target.value)} id='Rental Price' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.price }, input: { endAdornment:<InputAdornment position="end">{price.length} / {formlength.price}</InputAdornment> }}}></TextField>  : null} 
          {showfilterform ? <TextField variant="standard" label='Price starts from' value={pricefrom} onChange={(e) => setPriceFrom(e.target.value)} id='Price from' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.price }, input: { endAdornment:<InputAdornment position="end">{price.length} / {formlength.price}</InputAdornment> }}}></TextField>  : null} 
          {showfilterform ? <TextField variant="standard" label='Price range upto' value={priceto} onChange={(e) => setPriceTo(e.target.value)} id='Price to' sx={{ mb:1 }} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.price }, input: { endAdornment:<InputAdornment position="end">{price.length} / {formlength.price}</InputAdornment> }}}></TextField> : null} 
          <Box align='center'><Button onClick={showfilterform ? handleApplyFilter : handleSubmitData} variant="contained" endIcon={<SendIcon />} size="small" sx={{ mt:1 }}>{showfilterform ? 'Apply filters' : 'Submit Data'}</Button></Box>
      </Container> 
    )
  } 
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={()=>{setSnackbar('')}} >
        <CloseIcon fontSize="small" /> </IconButton>
    </React.Fragment>
  );
  // ------------------------------------------------------------------------------------------
  // ------------------------------------------------------------------------------------------
  return (
    <div><Container sx={{ p:0,mt:8,mb:6.5}}>
      <Box sx={{ width: '100%'}}><ThemeProvider theme={darkTheme}>
        <AppBar position="fixed" color="primary" >
          <Toolbar>            
            <IconButton size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 0 }}>🏠</IconButton>
            <Typography noWrap align="center" variant="h6" sx={{ mt:0.5,fontStyle: 'italic',fontSize: 20, fontFamily: 'Monospace',letterSpacing: 1.5 }}>RentMe</Typography>
            <Stack direction="row" spacing={0.5} sx={{ marginLeft: 'auto' }}>
              { !showhome 
                ? <IconButton onClick={handleMenuOpen1} aria-controls="menu-appbar1" size="small">
                    <HomeIcon /></IconButton> : null}
              { showhome
                ? <IconButton onClick={handleMenuOpen2} aria-controls="menu-appbar2" size="small">
                    <FilterAltIcon /></IconButton>: null}
              { !showform 
                ? <IconButton onClick={handleMenuOpen3} aria-controls="menu-appbar3" size="small">
                    <AddIcon /></IconButton> : null}
              { loginStatus && !showuser 
                ? <IconButton onClick={handleMenuOpen4} aria-controls="menu-appbar4" size="small">
                    <DensityMediumIcon /></IconButton> : null}
              { loginStatus 
                ? <IconButton onClick={handleMenuOpen5} aria-controls="menu-appbar5" size="small">
                    <AccountCircleIcon /></IconButton>: null}
                     {/* aria-label="home""filter""form""fetch""login" aria-haspopup="true"  */}
            </Stack></Toolbar></AppBar></ThemeProvider>
      </Box>

      <Menu open={Boolean(anchorEl)} onClose={handleMenuClose1}  id="menu-appbar1" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={handleHomePage} sx={{ bgcolor: '#D9D9D9' }}>Home Page</MenuItem></Menu>
      <Menu open={Boolean(anchorE2)} onClose={handleMenuClose2}  id="menu-appbar2" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={handleFilter} sx={{ bgcolor: '#D9D9D9' }}>Filter Results</MenuItem></Menu>
      <Menu open={Boolean(anchorE3)} onClose={handleMenuClose3}  id="menu-appbar3" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={loginStatus ? handleMyForm : handleDialogOpen} sx={{ bgcolor: '#D9D9D9' }}>Add Place</MenuItem></Menu>
      <Menu open={Boolean(anchorE4)} onClose={handleMenuClose4}  id="menu-appbar4" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={handleUserPage} sx={{ bgcolor: '#D9D9D9' }}>My Places</MenuItem></Menu>
      <Menu open={Boolean(anchorE5)} onClose={handleMenuClose5}  id="menu-appbar5" anchorOrigin={{vertical: 'top',horizontal: 'right',}} transformOrigin={{vertical: 'top',horizontal: 'right',}} keepMounted >
        <MenuItem onClick={handleLogOut} sx={{ bgcolor: '#D9D9D9' }}>Log Out</MenuItem></Menu>      
      
      <Dialog open={dialogOpen} onClose={()=>{setDialogOpen(false);setDialogPage(1)}} >
        <DialogTitle color='primary' >
          <Typography align="center" sx={{ fontSize: text_large }}>Please Sign In to continue</Typography>
          {dialogPage == 2 ? <Typography align="center" sx={{ color:'text.secondary',fontSize: text_medium }}>{newuser ? 'New Account' : 'Existing User'}</Typography> : null}
        </DialogTitle>
        {dialogPage == 1    
        ? <DialogContent><Stack spacing={2} sx={{ justifyContent: 'center' }}>
            <Button onClick={()=>{setNewUser(true);setDialogPage(2)}} variant="outlined" size="small" >New Account</Button>
            <Button onClick={()=>{setNewUser(false);setDialogPage(2)}} variant="outlined" size="small" >Existing User</Button>
            <Button onClick={()=>{setDialogOpen(false);setChecked(false);setDialogPage(1);setNewUser(false)}} variant="text" size="small" >Close</Button></Stack></DialogContent>
        : <><DialogContent>
            <TextField required fullWidth onChange={(e) => setEnterName(e.target.value)} id="text1" label="Owner name" variant="standard" size="small" slotProps={{ htmlInput: { maxLength: formlength.locality }, input: { endAdornment:<InputAdornment position="end">{entername.length} / {formlength.ownername}</InputAdornment> }}}></TextField>
            <TextField required fullWidth onChange={(e) => setEnterPhone(e.target.value)} id="text2" label="Phone number " variant="standard" size="small" slotProps={{ htmlInput: { maxLength: formlength.locality }, input: { endAdornment:<InputAdornment position="end">{enterphone.length} / {formlength.phoneno}</InputAdornment> }}}></TextField>
            <TextField required fullWidth onChange={(e) => setPassword(e.target.value)} id="text3" label="Password " variant="standard" size="small" slotProps={{ htmlInput: { maxLength: formlength.password }, input: { endAdornment:<InputAdornment position="end">{password.length} / {formlength.password}</InputAdornment> }}}></TextField></DialogContent>
            {!newuser && <Box align='center'  ><FormControlLabel checked={checked} onChange={() => {setChecked(!checked)}} control={<Checkbox />} label="Remember me" /></Box>}
          <DialogActions sx={{justifyContent:'center'}}>
            <Button onClick={()=>{setDialogPage(1);setNewUser(false)}} variant="text" size="small">Back</Button>
            <Button onClick={handleSignIn} disabled={signInloading} loading={signInloading} variant="contained" size="small">{newuser ? 'Create' : 'Sign In'}</Button>
            {/* {signInloading ? <CircularProgress size={40} sx={{ position: 'absolute', top: '50%', left: '50%',marginTop: '-12px',marginLeft: '-12px',}} /> : null} */}
            <Button onClick={()=>{setDialogOpen(false);setChecked(false);setDialogPage(1);setNewUser(false)}} variant="text" size="small">Close</Button></DialogActions></>
        }
      </Dialog>

      <Backdrop open={progress} onClick={()=>{setProgress(false)}}>
        <CircularProgress color="inherit" /></Backdrop>
      <Snackbar open={snackbar!=''} autoHideDuration={3000} onClose={()=>{setSnackbar('')}} message={snackbar} action={action} />
      
      <Typography noWrap align="center" sx={{ml:2, fontSize: text_medium }}>{loginStatus ? ownername+' @'+phoneno : defaultuserid}</Typography> 
        
      { (showform || showfilterform) && <ShowForms></ShowForms>}
      { showhome && <DrawComponents rows={homerows}></DrawComponents> }
      { showfav && <DrawComponents rows={favrows}></DrawComponents> }
      { showuser && <DrawComponents rows={userrows}></DrawComponents>}
      { showfilter && <DrawComponents rows={filterrows}></DrawComponents>}

      { showrating && <Box sx={{p:2,mt:1,bgcolor:'lightgray'}}>
        <Typography align="center" sx={{ mb:1,fontSize: text_large, fontStyle:'bold',color:'text.primary' }}>Rating and Feedback</Typography>
          <Box align="center" ><Rating  onChange={(event, newValue) => {setRating(newValue);}} name="customized-10" value={rating} max={10} size='large'/></Box>
          <TextField variant="outlined" label='Suggestions and Improvements' value={feedback} onChange={(e) => {setFeedback(e.target.value)}} id='Feedback' multiline sx={{ mb:1 ,mt:2}} fullWidth size="small" slotProps={{ htmlInput: { maxLength: formlength.feedback }}}></TextField>
          <Typography align="right" sx={{ fontSize: text_medium, fontStyle:'bold',color:'text.secondary' }}>{feedback.length} / {formlength.feedback}</Typography>
          <Box align='center' ><Button onClick={handleFeedbackSubmit} variant="contained" endIcon={<SendIcon />} size="small" sx={{ mt:1 }}>Submit</Button></Box>
          <Typography align="center" sx={{ mb:1,mt:5,fontSize: text_large, fontStyle:'bold',color:'text.primary' }}>Contact</Typography>
          <Typography align="center" sx={{ fontSize: text_small, fontStyle:'bold',color:'text.secondary' }}>Manish Gupta, 9129065824</Typography>
          <Typography align="center" sx={{ fontSize: text_small, fontStyle:'bold',color:'text.secondary' }}>guptamanish317@gmail.com</Typography>
          <Typography align="center" sx={{ fontSize: text_small, fontStyle:'bold',color:'text.secondary' }}>Kanpur, Uttar Pradesh</Typography>
      </Box>}
      { showfeatures && <Box sx={{p:2,mt:1,bgcolor:'lightgray'}}><Typography align="center" sx={{ mb:1,fontSize: text_large , fontStyle:'bold',color:'text.primary'}}>Features & Instructions</Typography>
                            <List>
                              {featureslist.map(feature =>
                              <ListItem disablePadding key={generateRandomString(8)} >
                                <Box sx={{width: '100%'}}><Typography sx={{ fontSize: text_small,color:'text.secondary' }}>
                                  <FlashOnIcon sx={{pt:0.5}} color='primary' fontSize='medium'/>{feature}</Typography>
                                <Divider sx={{pt:0.5,width: '100%'}}/></Box></ListItem>)}
                            </List></Box>}
      
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={1} >
        <BottomNavigation showLabels onChange={(event, newValue) => {setNavigation(newValue)}}sx={{ bgcolor:'#A59D84'}}>
            <BottomNavigationAction  label={navigation!=0 ? "Rating" : null} onClick={handleRating} icon={navigation==0 ? <StarOutlinedIcon sx={{ color:'#E9A319'}} fontSize="large"/> : <StarOutlinedIcon/>} />
            <BottomNavigationAction label={navigation!=1 ? "Favorites" : null} onClick={handleFavorites} icon={navigation==1 ? <FavoriteIcon sx={{ color:'#ff6d75'}} fontSize="large"/> : <FavoriteIcon />} />
            <BottomNavigationAction label={navigation!=2 ? "Features" : null} onClick={handleFeatures} icon={navigation==2 ? <RocketLaunchIcon color="secondary" fontSize="large"/> : <RocketLaunchIcon />} />
        </BottomNavigation></Paper>
    </Container></div>
  );
}
