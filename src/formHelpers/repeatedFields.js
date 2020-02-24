import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'

import ButtonStyledComponent from '../styledComponents/button';

const renderRepeatedFields = ({
  fields,
  buttonText,
  entityText,
  readonly,
  ChildComponent,
  meta: { touched, error }
}) => (
  <div>
    <Typography color='textPrimary'>
      {
        readonly &&
        fields.length === 0 &&
        `No ${entityText}`
      }
    </Typography>
    <ul className='undecorated'>
      {fields.map((field, index) =>
        <li key={index} className='fieldGroup'>
          <Box pb={2}>
            {
              !readonly &&
              <ButtonStyledComponent
                className='repeatedFieldsRemove link error'
                type='button'
                onClick={() => fields.remove(index)}>
                Remove
              </ButtonStyledComponent>
            }
            <Typography variant='h6' color='textPrimary'>
              {entityText} #{index + 1}
            </Typography>
          </Box>
          <ChildComponent prefix={field} readonly={readonly} />
        </li>
      )}
      {
        !readonly &&
        <li>
          <Button
            variant='contained'
            color='primary'
            onClick={() => fields.push({})}>
            { buttonText }
          </Button>
          {touched && error && <span>{error}</span>}
        </li>
      }
    </ul>
  </div>
)

export default renderRepeatedFields
