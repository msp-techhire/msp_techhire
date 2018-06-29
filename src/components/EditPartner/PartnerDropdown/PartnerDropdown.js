import React from 'react';

const partnerDropdown = (props) => {

    let partners = props.partners.map(partner => <option value={partner.id} key={partner.id}>{partner.org_name}</option>);

    return <select name="selectedPartner" onChange={props.selectPartnerFromDropdown}>
            {partners}
           </select>
}

export default partnerDropdown