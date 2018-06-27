import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    selectedPartner: state.editPartnerReducer.selectedPartner,
  });

const EditPartnerInfoForm = (props) => {
    if (!props.show) {
        return null;
    }

    return <div>
        <h1>Edit Partner Info Form</h1>
        <button onClick={props.closeModal}>Close Edit Modal</button>
    </div>
}

export default connect(mapStateToProps)(EditPartnerInfoForm);