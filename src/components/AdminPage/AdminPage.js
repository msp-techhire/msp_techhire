import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import axios from 'axios';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';

import JsonArrayToCsv from '../JsonArrayToCsv/JsonArrayToCsv';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// import Modal from './modal/modal';

const PAGE_LENGTH = 25;

const mapStateToProps = state => ({
  user: state.user,
});

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      resultsLength: 0,
      currentPage: 0,
      totalPages: 0,
      searchQuery: '',
      fieldSearchQuery: '',
      fieldName: '',
      editStudent: {},
      personColumns: null,
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && (this.props.user.userName === null || this.props.user.userRole !== 'admin')) {
      this.props.history.push('login');
    }
  }

  logout = () => {
    this.props.dispatch(triggerLogout());
    this.props.history.push('login');
  }

  // getTableColumns = tableName => {
  //   axios.get(`/api/admin/columns/${tableName}`).then(response => {
  //     const data = response.data;
  //     let columns = [];
  //     for (let item of data) {
  //       columns.push(item.column_name);
  //     }
  //     this.setState({
  //       personColumns: columns,
  //     });
  //   }).catch(error => {
  //     console.error(`ERROR trying to GET /api/admin/columns/:name: ${error}`);
  //     alert('Error: Retrieving table columns was unsuccessful.');
  //   });
  // }

  fetchData = () => {
    axios.get(`/api/admin`, {
      params: {
        search: this.state.searchQuery
      }
    }).then((response) => {
      const data = response.data;
      const totalPages = Math.ceil(data.length / PAGE_LENGTH);
      this.setState({
        results: data,
        resultsLength: data.length,
        currentPage: 1,
        totalPages: totalPages,
      });
    }).catch((error) => {
      console.error(error);
      alert('error with GET in Admin file', error);
    })
  }

  singleFieldSearch = () => {
    const name = this.state.fieldName;
    const query = this.state.fieldSearchQuery;
    axios.get(`/api/admin/${name}?search=${query}`).then(response => {
      this.setState({
        results: response.data
      });
    }).catch(error => {
      console.error(`ERROR trying to GET /api/admin/field/:name?search=[QUERY]:\n${error}`);
      alert('Error in field search.');
    });
  }

  handleSearchChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  editStudent = person => {
    this.setState({ editStudent: person }, () => {
      let student = this.state.editStudent;
      console.log(student);
    });
  }

  goToPage = page => {
    this.setState({
      currentPage: page,
    });
  }

  listPage = page => {
    if (this.state.currentPage === page) return <span style={{ color: "blue" }}>{page}</span>
    return <span style={{ textDecoration: "underline" }}>{page}</span>
  }

  render() {
    let content = null;
    let buttonDisplayed = <Button id="searchButtons" variant="outlined" size="small" onClick={this.fetchData}>Search</Button>
    let currentResults = [];
    let lowerResults = (this.state.currentPage - 1) * PAGE_LENGTH;
    let upperResults = this.state.currentPage * PAGE_LENGTH;
    for (let i = lowerResults; i < upperResults; i++) {
      if (this.state.results[i]) currentResults.push(this.state.results[i]);
    }

    let pages = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      pages.push(<span key={`page-${i}`}>
        <a
          className="page-listing il-block"
          // style={{ fontSize: "12pt", cursor: "pointer" }}
          onClick={() => this.goToPage(i + 1)}>{this.listPage(i + 1)}</a> </span>
      );
    }

    if (this.props.user.userName) {
      content = (
        <div id="mplsPhoto">
          {this.props.data}
          <div id="mplsPhoto">
          </div>
          <div>
            <p id="searchTextTopOfPage">
              Search Page
          </p>
          </div>
          <div class="wrapperGridAdmin">
          <div id="inputFieldSearch" className="il-block">
            <div className="il-block">
              <TextField
                id="fieldSearch"
                onChange={this.handleSearchChange}
                name="fieldSearchQuery"
                value={this.state.fieldSearchQuery}
                label="Search Single Field"
                placeholder="Search"
                margin="normal" ></TextField>
              {buttonDisplayed}
            </div>
            <div className="il-block">
              <TextField
                id="addSearch"
                onChange={this.handleSearchChange}
                name="searchQuery"
                value={this.state.searchQuery}
                label="Search Everything"
                placeholder="Search"
                margin="normal" ></TextField>
              {buttonDisplayed}
            </div>
          </div>
          <JsonArrayToCsv convert={this.state.results} />
          </div>
          <div>
              <Table id="searchTableResults">
                <TableHead>
                  <TableRow id="tableHeader">
                    <TableCell>Gender</TableCell>
                    <TableCell>POC</TableCell>
                    <TableCell>Ed Level</TableCell>
                    <TableCell>Scholarship</TableCell>
                    <TableCell>Pre-wage</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>New wage</TableCell>
                    <TableCell>Exit Status</TableCell>
                    <TableCell>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentResults.map((person, i) => (
                    <TableRow key={i} id="onHoverTableHighlight">
                      <TableCell>{person.gender}</TableCell>
                      <TableCell>{person.person_of_color}</TableCell>
                      <TableCell>{person.education_level}</TableCell>
                      <TableCell>{person.scholarship_recipient}</TableCell>
                      <TableCell>{person.pre_training_wage}</TableCell>
                      <TableCell>{person.start_date}</TableCell>
                      <TableCell>{person.title}</TableCell>
                      <TableCell>{person.company}</TableCell>
                      <TableCell>{person.starting_wage}</TableCell>
                      <TableCell>{person.exit_status}</TableCell>
                      {/* <TableCell><Modal /></TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
          <div style={{ textAlign: "center" }}>
            {pages}<br />
            Total results: {this.state.resultsLength}
          </div>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        {content}
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdminPage);