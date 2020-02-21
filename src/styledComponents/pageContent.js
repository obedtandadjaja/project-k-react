import styled from 'styled-components'
import { sizing, spacing, palette, flexbox, display} from '@material-ui/system'

import { DEVICE_SIZE } from './../constants'

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 64px;
  padding: 40px;
  background-color: ${(props) => props.theme.palette.background.default};

  h1 {
    font-weight: bold;
    margin-bottom: 1em;
    color: ${(props) => props.theme.palette.text.primary};
  }

  ${spacing}
  ${sizing}
  ${palette}
  ${display}
  ${flexbox}

  @media ${DEVICE_SIZE.mobileL} {
    padding: 20px;
  }
`

export default PageContent
