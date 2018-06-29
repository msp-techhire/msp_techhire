import React from 'react';
import EditPartnerInfoForm from '../EditPartnerInfoForm/EditPartnerInfoForm';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const SelectedPartnerInfo = (props) => {

    return <div>
        <h1>Partner Information</h1>
        <Paper>
            <Table id="selectedPartnerTable">
                <TableHead>
                    <TableRow>
                        <TableCell>Org Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Director</TableCell>
                        <TableCell>Business Type</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Website</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{props.selectedPartner.orgName}</TableCell>
                        <TableCell>{props.selectedPartner.orgAddress}</TableCell>
                        <TableCell>{props.selectedPartner.directorFirst} {props.selectedPartner.directorLast}</TableCell>
                        <TableCell>{props.selectedPartner.businessType}</TableCell>
                        <TableCell>{props.selectedPartner.orgPhone}</TableCell>
                        <TableCell>{props.selectedPartner.orgWebsite}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper >
        <button onClick={props.openEditPartnerModal}>Edit Partner Information</button>
        <EditPartnerInfoForm
            show={props.show}
            closeEditPartnerModal={props.closeEditPartnerModal}
            selectedPartner={props.selectedPartner}
            handleEditChange={props.handleEditChange}
            updatePartnerInfo={props.updatePartnerInfo}
            selectedPartnerID={props.selectedPartnerID}
        />
    </div>
}

export default SelectedPartnerInfo;