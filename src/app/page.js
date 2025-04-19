"use client";

import React from 'react';
// import axios from "axios";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import Grid from '@mui/material/Grid';

export default function Home() {
 
  const [table, setTable] = React.useState([]);  
  
  const SHEET_ID = '1u-QIUZT6b09gkj3xf4u9KRpRprkUn4PTAaOl9G5fitU'; 
  const API_KEY = 'AIzaSyDTBUXGrjE-BmYeONaAsBd56qGPeTGHF8c';
  const range = 'Sheet1!A:C'; 

  const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  async function fetchSheetData() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch data');
      const sheetdata = await response.json();
      // console.log(sheetdata.values)

      // let tableDataValues = [
      //   ['id','name','age'],
      //   [1,'Alice',25],
      //   [2,'Bob',30],
      //   [3,'Charlie',35]
      // ]
      
      setTable(sheetdata.values) 
    }catch (error) {        
        console.log(error.message);        
    }
  }
  
  function DrawTables (tableData) {
    // console.log(tableData)
    const proptableData = tableData.tableData
    let tableheader = proptableData[0]
    // console.log(tableheader)
    var tablerows = []
    for (let i = 1; i < proptableData.length; i++) {
      tablerows.push(proptableData[i])
    }
    // console.log(tablerows)
    return(
      <TableContainer sx={{ width: '95%',bgcolor: "lightgrey"}} component={Paper}>
        <Table sx={{ width: '100%' }} size="small" aria-label="a dense table">
          <TableHead> 
            <TableRow sx={{bgcolor: "darkgrey"}}>
              {tableheader.map((row) => (
                <TableCell key={row} align="center">
                  <Typography component="div" sx={{textDecoration: 'underline'}}>
                    <Box sx={{ fontWeight: 'bold' }}>{row}</Box>
                  </Typography>
                </TableCell>                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tablerows.map((row) => (
              <TableRow
                key={row[0]}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {row.map((cell) => (
                  <TableCell key={cell} align="center">{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  
  return (
    <div >
      <Typography align="center" variant="h4" noWrap component="div">
        💙 RentMe 🚀
      </Typography>
      <Typography align="center" variant="h5" noWrap component="div">
        Places available for rent
      </Typography>
      <div align="center">
        <Button           
          onClick={fetchSheetData}
          variant="contained" 
          size="small"
          color="primary">Fetch Data</Button>
      </div>
      <Divider orientation="horizontal" flexItem></Divider>
      <div align="center" style={{padding:'10px'}}>
        {table.length>0 ? <DrawTables tableData={table}></DrawTables> : null}
      </div>
    </div>
  );
}
