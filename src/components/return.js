import React from 'react'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const ReturnButton = () => {
  const history = useHistory()

  const goBack = () => {
    history.goBack()
  }

  return(
    <IconButton size='medium' onClick={goBack}>
      <ArrowBackIosIcon />
    </IconButton>
  )
}

export default ReturnButton
