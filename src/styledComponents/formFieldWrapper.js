import styled from 'styled-components'

const FormFieldWrapper = styled.div`
  color: ${(props) => props.theme.palette.text.primary};
  margin-bottom: 2em;

  input {
    width: 100%;
  }

  .MuiFormControl-root {
   width: 100%;
  }

  .MuiSelect-select {
    width: 100%;
  }
`

export default FormFieldWrapper
