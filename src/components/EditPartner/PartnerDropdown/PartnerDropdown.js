import React from 'react';

const partnerDropdown = (props) => {

    let partners = props.partners.map(partner => <option value={partner} key={partner}>{partner}</option>);

    return <select name="selectedPartner" onChange={props.handleChange}>
        {partners}
    </select>
}

export default partnerDropdown