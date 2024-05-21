import {
  useTheme,
  Box,
  Fab,
  Dialog,
  Slide,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  Toolbar,
  DialogActions,
  Button,
} from '@mui/material';
import { forwardRef, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CreateRecipe = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 80, right: 80 }}>
        <Fab
          color='default'
          aria-label='add'
          size='small'
          onClick={handleClick}
        >
          <AddIcon />
        </Fab>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
        maxWidth='sm'
        fullWidth
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>Create A New Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <Typography variant='h4'>
              Please Enter the Following Fields
            </Typography>
          </DialogContentText>
          <Toolbar />
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button>Upload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateRecipe;
