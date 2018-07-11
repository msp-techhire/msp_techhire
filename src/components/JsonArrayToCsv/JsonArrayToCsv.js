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
    console.error(`ERROR with covert`);
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