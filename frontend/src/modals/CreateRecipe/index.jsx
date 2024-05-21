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
  TextField,
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
  const [recipeName, setRecipeName] = useState('');
  const [steps, setSteps] = useState(['']);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setRecipeName('');
    setSteps(['']);
    setOpen(false);
  };

  const handleUpload = () => {
    setRecipeName('');
    setSteps(['']);
    setOpen(false);
  };

  const handleRecipeNameChange = (event) => {
    setRecipeName(event.target.value);
  };

  const handleStepChange = (index, event) => {
    const newSteps = steps.slice();
    newSteps[index] = event.target.value;
    setSteps(newSteps);
  };

  const addStep = () => {
    if (steps[steps.length - 1].trim() !== '') {
      setSteps([...steps, '']);
    }
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
        maxWidth='md'
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
          <TextField
            autoFocus
            margin='dense'
            id='recipe-name'
            label='Recipe Name'
            type='text'
            fullWidth
            variant='outlined'
            value={recipeName}
            onChange={handleRecipeNameChange}
            sx={{ marginBottom: 2 }}
          />
          {steps.map((step, index) => (
            <TextField
              key={index}
              margin='dense'
              id={`step-${index}`}
              label={`Step ${index + 1}`}
              type='text'
              fullWidth
              variant='outlined'
              multiline
              rows={4}
              value={step}
              onChange={(event) => handleStepChange(index, event)}
              sx={{ marginBottom: 2 }}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={addStep} variant='outlined'>
              Add Step
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateRecipe;
