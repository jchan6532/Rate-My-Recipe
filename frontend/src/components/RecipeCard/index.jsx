import { useEffect, useState } from 'react';
import { Icon, IconButton, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { CardActionArea, CardActions } from '@mui/material';
import moment from 'moment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const RecipeCard = ({ RecipeData, options }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [thumbnail, setThumbnail] = useState('./images/default-recipe.jpg');

  return (
    <Card
      sx={{
        width: '40vw',
        borderRadius: '25px',
        p: '10px',
        backgroundColor: theme.palette.mode === 'light' ? '#dbd0c3' : '#222222',
      }}
      key={RecipeData.id}
    >
      <CardActionArea onClick={() => 1}>
        <CardMedia
          component='img'
          height='300'
          image={thumbnail}
          alt='post image'
          sx={{ objectFit: 'cover', borderRadius: '25px' }}
        />
        <CardContent>
          <Box display='flex' justifyContent='space-between'>
            <Typography gutterBottom variant='h5' component='div'>
              {RecipeData.name}
            </Typography>
            <Typography gutterBottom variant='subtitle2' component='div'>
              <i>{moment(RecipeData.createdAt).fromNow()}</i>
            </Typography>
          </Box>
          <Typography variant='body1' color='text.secondary'>
            <i>by {RecipeData.score}</i>
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            {RecipeData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          display='flex'
          justifyContent='space-between'
          p={'2px'}
          width='100%'
        >
          <Box display='flex'>
            <IconButton sx={{ ':hover': { background: '#a3a3a3' } }}>
              <FavoriteBorderOutlinedIcon />
            </IconButton>
            <IconButton sx={{ ':hover': { background: '#a3a3a3' } }}>
              <CommentOutlinedIcon />
            </IconButton>
          </Box>
          <StyledRating
            name='customized-color'
            defaultValue={2}
            getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
            precision={1}
            icon={<FavoriteIcon fontSize='inherit' />}
            emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
          />
          <Box displat='flex'>
            <IconButton sx={{ ':hover': { background: '#a3a3a3' } }}>
              <BookmarksOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
