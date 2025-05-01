import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

export async function POST(req, res) {
  if (!db) {
    db = await open({
      filename: "./collection.db", 
      driver: sqlite3.Database, 
    });
  }

  // Extract the "id" from the URL by splitting the URL and taking the last element
  const id = req.url.split("/").pop();
  console.log(req.method);
  const body = await req.json()
  console.log(body);

  let sheetdataArray = []

  if (body.command== 'create') {
    const sql = `INSERT INTO items(title, description, propertyaddress, locality, city, ownername, phoneno, rentalprice, paymentstatus, userid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db.run(sql, body.payload, function (err) {
      if (err) {
          return console.error(err.message);
      }
      const id = this.lastID; // get the id of the last inserted row
      console.log(`Rows inserted, ID ${id}`);
      });
  }

  if (body.command== 'read') {
    // const itemId = [2,5]
    const userId = '123'
    var item_Object_array = []

    const sql = "SELECT * FROM items WHERE userid = ?"

    // for(let i=0;i<itemId.length;i++){
      // const item_Object = await db.get(sql, itemId[i]);
      item_Object_array = await db.all(sql, userId);
      // item_Object_array.push(item_Object)
      // console.log(item_Object_array)
    // } 

    sheetdataArray = convertFetchedData(item_Object_array)
  }

  if (body.command== 'delete') {
    const itemId = body.payload[0]

    const sql = `DELETE FROM items WHERE id = ?`

    await db.run(sql, [itemId], function (err) {
      if (err) {
          return console.error(err.message);
      }
      console.log(`Row deleted.`);
      });
  }

  if (body.command== 'update') {
    const updatedArray = body.payload
    const itemId = updatedArray[0]
    let ValuesArray = updatedArray.slice(1,updatedArray.length)
    ValuesArray.push(itemId)

    const sql = `UPDATE items SET title = ?, description = ?, propertyaddress = ?, locality = ?, city = ?, ownername = ?, phoneno = ?, rentalprice = ?, paymentstatus = ?, userid = ? WHERE id = ?`

    await db.run(sql, ValuesArray, function (err) {
      if (err) {
          return console.error(err.message);
      }
      console.log(`Row Updated.`);
      });
  }
  

  return new Response(JSON.stringify(sheetdataArray), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });

}


function convertFetchedData(dbData){
  // convert jsonObjectArray key:value data retrived from db to GoogleSheet response format array with headers and values 
  const keysArray = Object.keys(dbData[0]);
  let jsonObjectsToArray = [keysArray]
  dbData.forEach(object => ( 
    jsonObjectsToArray.push(Object.values(object))
  ))
  const sheetdata = { values: jsonObjectsToArray}  
  return(sheetdata)  
}

