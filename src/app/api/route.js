import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function GET(req, res) {

  if (!db) {
    db = await open({
      filename: "./collection.db", 
      driver: sqlite3.Database, 
    });
  }

  let sheetdataArray = convertFetchedData(await db.all("SELECT * FROM items"))
  // console.log(sheetdataArray)

  return new Response(JSON.stringify(sheetdataArray), {
    headers: { 
      "Content-Type": "application/json" 
    },
    status: 200,
  });
}

function convertFetchedData(dbData){
  // convert jsonObject data retrived from db to GoogleSheet response array  
  const keysArray = Object.keys(dbData[0]);
  let jsonObjectsToArray = [keysArray]
  dbData.forEach(object => ( 
    jsonObjectsToArray.push(Object.values(object))
  ))
  const sheetdata = { values: jsonObjectsToArray}  
  return(sheetdata)  
}
