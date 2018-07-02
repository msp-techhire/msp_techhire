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

const exportCsv = encodedUri => {
  let link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'data.csv');
  link.setAttribute('hidden', 'hidden');
  link.click();
}

const processArray = array => {
  let csvContent = 'data:text/csv;charset=utf-8,';
  array.forEach(row => {
    let newRow = row.join(',');
    csvContent += newRow + '\r\n';
  });
  const encodedUri = encodeURI(csvContent);
  exportCsv(encodedUri);
}

const convert = data => {
  try {
    let columns = Object.keys(data[0]);
    let rows = [columns];
    for (let row of data) {
      let newRow = [];
      for (let field of columns) {
        newRow.push(row[field]);
      }
      rows.push(newRow);
    }
    processArray(rows);
  } catch(error) {
    console.error(`ERROR trying to convert input: ${data}\n${error}`);
  }
}

const JsonArrayToCsv = props => (
  <div className="JsonArrayToCsv" style={{ display: "inline-block" }}>
    {props.convert.length > 0 ?
    <button className="jsonButton" onClick={() => convert(props.convert)}>Download CSV Spreadsheet</button> :
    <button className="jsonButton" disabled="disabled">Download CSV Spreadsheet</button> }
  </div>
);

export default JsonArrayToCsv;