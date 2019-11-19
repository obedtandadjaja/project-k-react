import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function UserEditPage(props) {
  const editSubmit = (event) => {
  }

  return (
    <div className='userEditPage'>
      <table>
        <tbody>
          <tr>
            <td>Name:</td>
            <td><input id='userEditName' type='text' /></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td><input id='userEditEmail' type='text' /></td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td><input id='userEditPhone' type='text' /></td>
          </tr>
          <tr>
            <td>Gender:</td>
            <td><input id='userEditGender' type='text' /></td>
          </tr>
          <tr>
            <td>Marriage status:</td>
            <td><input id='userEditMarriageStatus' type='text' /></td>
          </tr>
          <tr>
            <td>Religion:</td>
            <td><input id='userEditReligion' type='text' /></td>
          </tr>
          <tr>
            <td>Identification:</td>
            <td>
              <select id='userEditIdentificationType'>
                <option value='KTP ID/NIK'>KTP ID/NIK</option>
                <option value='KITAD ID'>KITAS ID</option>
                <option value='Passport Number'>Passport Number</option>
              </select>
              <input id='userEditIdentificationValue' type='text' />
            </td>
          </tr>
          <tr>
            <td>Occupation:</td>
            <td>
              <select id='userEditOccupation'>
                <option value='student'>Student</option>
                <option value='professional'>Professional</option>
                <option value='unemployed'>Unemployed</option>
                <option value='other'>Other</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Company name:</td>
            <td><input id='userEditCompanyName' type='text' /></td>
          </tr>
          <tr>
            <td>Work address:</td>
            <td><input id='userEditWorkAddress' type='text' /></td>
          </tr>
          <tr>
            <td>Work phone:</td>
            <td><input id='userEditWorkPhone' type='text' /></td>
          </tr>
          <p>Emergency contact:</p>
          <tr>
            <td>Name:</td>
            <td><input id='userEditEmergencyContactName' type='text' /></td>
          </tr>
          <tr>
            <td>Address:</td>
            <td><input id='userEditEmergencyContactAddress' type='text' /></td>
          </tr>
          <tr>
            <td>Relation to tenant:</td>
            <td>
              <select id='userEditEmergencyContactRelationship'>
                <option value='parent'>Parent</option>
                <option value='sibling'>Sibling</option>
                <option value='child'>Child</option>
                <option value='other'>Other</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Phone:</td>
            <td><input id='userEditEmergencyContactPhone' type='text' /></td>
          </tr>
          <tr>
            <td>Email:</td>
            <td><input id='userEditEmergencyContactEmail' type='text' /></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={editSubmit} disabled={props.loading}>
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage)
