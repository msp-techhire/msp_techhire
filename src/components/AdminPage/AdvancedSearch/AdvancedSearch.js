import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
  search: state.search,
});

class AdvancedSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      selection: null,
      value: null,
      field: '*',
    };
  }

  handleValueChange = event => {
    this.setState({
      value: event.target.value
    });
  }

  /* Field Displays START */
  all = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  formattedId = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. P-1015"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  partnerId = () => {
    return <input 
      type="number" 
      className="advanced-search" 
      placeholder="ie. 5" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange}/>
  }

  gender = () => {
    return <select 
      className="advanced-search" 
      onLoad={this.handleValueChange} 
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
      <option value="Unreported">Unreported</option>
    </select>
  }

  yearOfBirth = () => {
    return <input 
      type="number" 
      className="advanced-search" 
      placeholder="ie. 1985"
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  personOfColor = () => {
    return <select 
      className="advanced-search" 
      onLoad={this.handleValueChange} 
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
      <option value="Unreported">Unreported</option>
    </select>
  }

  educationLevel = () => {
    return <select 
      className="advanced-search" 
      onLoad={this.handleValueChange} 
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="HS/GED">HS/GED</option>
      <option value="Some College">Some College</option>
      <option value="Associates">Associates</option>
      <option value="Bachelors">Bachelors</option>
      <option value="Graduate and Beyond">Graduate and Beyond</option>
    </select>
  }

  cityOfResidence = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. Minneapolis" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  scholarshipRecipient = () => {
    return <select 
      className="advanced-search"  
      onLoad={this.handleValueChange} 
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  }

  previousJobExperience = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. Manager" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  preTrainingWage = () => {
    return <input 
      type="number" 
      className="advanced-search" 
      placeholder="ie. 15.25" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  trainingStartDate = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="DD/MM/YYYY" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  trainingStatus = () => {
    return <select 
      className="advanced-search" 
      onLoad={this.handleValueChange} 
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="In Training">In Training</option>
      <option value="Graduated">Graduated</option>
      <option value="Removed">Removed</option>
      <option value="Withdrew">Withdrew</option>
    </select>
  }

  trainingEndDate = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="DD/MM/YYYY" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  trainingType = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. IT Fundamentals" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  exitStatus = () => {
    return <select 
      className="advanced-search" 
      onLoad={this.handleValueChange} 
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Entered Employment">Entered Employment</option>
      <option value="Entered Military">Entered Military</option>
      <option value="Enrolled in Additional Training">Enrolled in Additional Training</option>
      <option value="Health/Medical">Health/Medical</option>
      <option value="Institutionalized">Institutionalized</option>
      <option value="Incarcerated">Incarcerated</option>
    </select>
  }

  classroomOrOnline = () => {
    return <select 
      className="advanced-search" 
      onLoad={this.handleValueChange} 
      onChange={this.handleValueChange}>
      <option value="">--Select--</option>
      <option value="Classroom">Classroom</option>
      <option vlaue="Online">Online</option>
    </select> 
  }

  startDate = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="DD/MM/YYYY" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  title = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. Junior Developer" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  company = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. Microsoft" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  startingWage = () => {
    return <input 
      type="number" 
      className="advanced-search" 
      placeholder="ie. 20.25" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondStartDate = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="DD/MM/YYYY" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondTitle = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. Web Developer" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondCompany = () => {
    return <input 
      type="text" 
      className="advanced-search" 
      placeholder="ie. Google" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }

  secondStartingWage = () => {
    return <input 
      type="number" 
      className="advanced-search" 
      placeholder="ie. 22.50" 
      onLoad={this.handleValueChange}
      onChange={this.handleValueChange} />
  }
  /* Field Displays END */

  handleFieldChange = event => {
    const selection = event.target.value;
    let setSelection;
    this.setState({value: null});
    switch(selection) {
      case '*':
        setSelection = this.all();
        break;
      case 'formatted_id':
        setSelection = this.formattedId();
        break;
      case 'partner_id':
        setSelection = this.partnerId();
        break;
      case 'gender':
        setSelection = this.gender();
        break;
      case 'year_of_birth':
        setSelection = this.yearOfBirth();
        break;
      case 'person_of_color':
        setSelection = this.personOfColor();
        break;
      case 'education_level':
        setSelection = this.educationLevel();
        break;
      case 'city_of_residence':
        setSelection = this.cityOfResidence();
        break;
      case 'scholarship_recipient':
        setSelection = this.scholarshipRecipient();
        break;
      case 'previous_job_experience':
        setSelection = this.previousJobExperience();
        break;
      case 'pre_training_wage':
        setSelection = this.preTrainingWage();
        break;
      case 'training_start_date':
        setSelection = this.trainingStartDate();
        break;
      case 'training_status':
        setSelection = this.trainingStatus();
        break;
      case 'training_end_date':
        setSelection = this.trainingEndDate();
        break;
      case 'training_type':
        setSelection = this.trainingType();
        break;
      case 'exit_status':
        setSelection = this.exitStatus();
        break;
      case 'classroom_or_online':
        setSelection = this.classroomOrOnline();
        break;
      case 'start_date':
        setSelection = this.startDate();
        break;
      case 'title':
        setSelection = this.title();
        break;
      case 'company':
        setSelection = this.company();
        break;
      case 'starting_wage':
        setSelection = this.startingWage();
        break;
      case 'second_start_date':
        setSelection = this.secondStartDate();
        break;
      case 'second_title':
        setSelection = this.secondTitle();
        break;
      case 'second_company':
        setSelection = this.secondCompany();
        break;
      case 'second_starting_wage':
        setSelection = this.secondStartingWage();
        break;
      default:
        setSelection = this.all();
        break;
    }
    this.setState({
      selection: setSelection,
      field: event.target.value,
    });
  }

  componentDidMount() {
    this.setState({ selection: this.all() });
  }

  render() {
    return (
      <div className="AdvancedSearch">
        <select className="advanced-search" onChange={this.handleFieldChange}>
          <option value="*">All Fields</option>
          <option value="formatted_id">Formatted ID</option>
          <option value="partner_id">Partner ID</option>
          <option value="gender">Gender</option>
          <option value="year_of_birth">Year of Birth</option>
          <option value="person_of_color">Person of Color</option>
          <option value="education_level">Education Level</option>
          <option value="city_of_residence">City of Residence</option>
          <option value="scholarship_recipient">Scholarship Recipient</option>
          <option value="previous_job_experience">Previous Job Experience</option>
          <option value="pre_training_wage">Pre-training Wage</option>
          <option value="training_start_date">Training Start Date</option>
          <option value="training_status">Training Status</option>
          <option value="training_end_date">Training End Date</option>
          <option value="training_type">Training Type</option>
          <option value="exit_status">Exit Status</option>
          <option value="classroom_or_online">Classroom or Online</option>
          <option value="start_date">First Job Start Date</option>
          <option value="title">First Job Title</option>
          <option value="company">First Company</option>
          <option value="starting_wage">First Job Starting Wage</option>
          <option value="second_start_date">Second Job Start Date</option>
          <option value="second_title">Second Job Title</option>
          <option value="second_company">Second Company</option>
          <option value="second_starting_wage">Second Job Starting Wage</option>
        </select>
        {this.state.selection}
        <button id="search-submit" className="advanced-search" onClick={this.search}>Search</button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AdvancedSearch);