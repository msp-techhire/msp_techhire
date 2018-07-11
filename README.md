## Project Title
MSP TechHire is an amazing program that partnered with several high-quality advanced learning programs and regional companies to train and hire a more diverse community in technology fields in the Saint Paul and Minneapolis area. MSP TechHire asked us to create a full-stack application to help track student success supported by the program from MSP TechHire's partner organizations. They also needed a way to transfer this data from their partners to the program quarterly. Finally, MSP TechHire wanted us to find a way to access the data uploaded by their partner organizations in order to show State Representatives ROI, efficient ways to access specific data for meetings, seamless ways to get data to see how they could improve the program for MSP TechHire and their partners, and quick ways to show potential sponsors how well the program is working in the community.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Create your database and tables using .mock-data/msp-mock-database.sql. The database in the code is named msp_techhire. If you would like to name your database something else, you will need to change msp_techhire to the name of your new database name in server/modules/pool.js  Start the server.

Run `npm install`

Create a .env file at the root of the project and paste this line into the file:

`SERVER_SESSION_SECRET=superDuperSecret`

While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: https://passwordsgenerator.net/. If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning.

Start postgres if not running already by using brew services start postgresql.

Run `npm run server` in your terminal.

Now that the server is running, open a new terminal tab with cmd + t and run `npm run client`

Navigate to `localhost:3000`

## Prerequisites

## Deployment

## Downloading CSV files
The "Download CSV File" button on the "Search" page of the admin portal will only download data rows that are returned in the table below it. Data for all columns, not just the columns visible within the table, will be downloaded. Use the "Search" fields above to tailor your table results to the data you wish to download.  If no search is run, the "Download CSV File" button will download all student data in the database.

The "Download CSV Spreadsheet" button on the "Summary" page of the admin portal will also download all student data in the database.

## Uploading CSV files
To upload student data, click on the "Upload File" button. Navigate to the spreadsheet you use to report MSP TechHire student data and click "Open".  This spreadsheet must be a .csv file.  This can be changed in Microsoft Excel while saving your spreadsheet.

## Built With
React - A JavaScript library for building user interfaces.
PostgreSQL - Open source database.
ChartJS - Open source HTML5 charts.
Node.js - A JavaScript runtime built on Chrome's V8 JavaScript engine.
Express - Web application framework running on Node.js.
Material-UI - React Components that Implement Google's Material Design.
Passport.js - Authentication middleware.
react-csv-parse - Import data from a csv file to your app and your api.

## Versioning
Version 1.0.0

## Authors
* Greg Orvik
* Michele Dexter
* Alex Gjorvad
* Liz Goff

License
This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments
Hat tip to anyone whose code was used
Inspiration
etc