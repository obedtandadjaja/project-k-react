import styled from 'styled-components'
import { sizing, spacing, palette, flexbox, display} from '@material-ui/system'

import { DEVICE_SIZE } from './../constants'

const CardStyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 5px;
  background-color: ${(props) => props.theme.palette.background.paper};
  padding: ${(props) => props.theme.space*2}px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  ${spacing}
  ${sizing}
  ${palette}
  ${display}
  ${flexbox}
`

export default CardStyledComponent
