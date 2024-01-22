import { TextField, useTheme } from '@mui/material';
import React from 'react'

function InputField(props) {
  const {handleChange,type,r,defaultValue,sx} = props;
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  return (
    <TextField 
      // ref={inputField}
      placeholder={type==='reply' ? "Add a reply..." : ((type==='edit') ? "Edit comment..." : "Add a comment...")}
      onChange={handleChange}
      defaultValue={defaultValue}
      minRows={3}
      // fullWidth
      multiline
      autoFocus={type==='reply'}
      sx={{
        flexGrow: 1,
        '& fieldset,&:hover fieldset': { border: 'none'},
        '& .MuiOutlinedInput-root': {
          p: 0,
          lineHeight: 1.5,
        },
        ...sx
      }}
      InputProps={{
          sx:{ 
            caretColor: dark,
            '& textarea': {
              py: 2,
              px: 3,
              color: dark,
              boxSizing: 'border-box',
              overflow: 'visible !important',
              borderRadius: '8px',
              border: '1px solid '+ dark,
              '&:focus': {
                borderColor: dark
              },
            },
            '& textarea::placeholder': {
              ...dark,
              color: dark,
              opacity: 1
            }
          } 
        }} 
        inputProps={{
          ref: r,
          'aria-label': 'markdown input',
        }}
    />
  )
}

export default InputField