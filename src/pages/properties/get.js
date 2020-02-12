import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Form from './../../components/properties/form'
import { FormStyledComponent } from './../../styledComponents/form'
import { get } from './../../api/properties'

const Style = styled.div`
  propertyGetPage{
    display: flex;
    flex-drection: column;
  }

  .mr-auto{
    color: 'blue';
  }

  button{
    color: '#18A0FB';
  }
`

function PropertyGetPage(props) {
  const { loading, error, property, get, currentUserID } = props
  const { propertyID } = props.match.params

  useEffect(() => {
    get(currentUserID, propertyID, { eager: 'Rooms' })
  }, [get, propertyID, currentUserID])

  return (
    <Style>
      <div className='propertyGetPage'>
        <div className='mr-auto'>
          <Link to={{ pathname: `/properties/${propertyID}/edit` }} >
            <button>
              Edit property
            </button>
          </Link>
        </div>
          {
            !loading &&
            property &&
            <FormStyledComponent>
              <Form
                initialValues={property}
                loading={loading}
                error={error}
                title='Property'
                readonly 
                />
            </FormStyledComponent>
          }
        
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['getLoading']),
  error: state.property.getIn(['getError']),
  property: state.property.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyGetPage)
