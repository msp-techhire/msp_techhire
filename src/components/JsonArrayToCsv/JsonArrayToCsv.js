/*
This component can be used just like a normal React Button component, but must
take in an array of objects, with each object having the same schema.
If it has an array of JSON objects, then it will take them and convert them
into a CSV file and automatically export the CSV to a download file.

Pass in the array of JSON objects using the prop name 'convert' as in:
<JsonArrayToCsv convert=myJsonArray />

where

myJsonArray = [
  {firstName: 'John', lastName: 'Doe'}, 
  {firstName: 'Jane', lastName: 'Doe'},
  {firstName: 'Joe', lastname: 'Schmo'},
  {firstName: 'Jil', lastName: 'Schmo'}
]

is converted to

firstName,lastName
John,Doe
Jane,Doe
Joe,Schmo
Jil,Schmo

and exported to a CSV file
*/

import React from 'react';

const convert = data => {
  console.log(data);
}

const JsonArrayToCsv = props => (
  <div className="JsonArrayToCsv">
    <button onClick={() => convert(props.convert)}>Download CSV Spreadsheet</button>
  </div>
);

export default JsonArrayToCsv;