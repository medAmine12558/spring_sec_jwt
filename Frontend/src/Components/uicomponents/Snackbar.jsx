import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function CustomizedSnackbars({text}) {
    const [open, setOpen] = React.useState(true);
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {text}
          </Alert>
        </Snackbar>
      </div>
    );
  }