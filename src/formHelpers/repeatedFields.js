import React from 'react'
import { Box, Button, Typography } from '@material-ui/core'

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
          <Box pb={2} display='flex' flexDirection='row' justifyContent='space-between'>
            <Typography variant='h6' color='textPrimary'>
              {entityText} #{index + 1}
            </Typography>
            {
              !readonly &&
              <Button
                type='button'
                variant='outlined'
                onClick={() => fields.remove(index)}>
                Remove
              </Button>
            }
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
