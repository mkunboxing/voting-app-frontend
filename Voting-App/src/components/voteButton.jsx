import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const VoteButton = ({ candidateName, showVoteButton, onVoteClick, showEditButton, onEditClick, showDeleteButton, onDeleteClick }) => {
  return (
    <Box display="flex" alignItems="center">
    <Typography variant="h6" style={{ marginRight: '8px' }}>
      {candidateName}
    </Typography>
    <ArrowForwardIcon fontSize="large" style={{ marginRight: '8px' }} />
    
    {showVoteButton && (
      <Button variant="outlined" color="primary" onClick={onVoteClick}>
      Vote
    </Button>
    )}
    

    {showEditButton && (
      <Button variant="outlined" color="primary" onClick={onEditClick} style={{ marginLeft: '8px' }}>
        Edit
      </Button>
    )}

    {showDeleteButton && (
      <Button variant="outlined" color="primary" onClick={onDeleteClick} style={{ marginLeft: '8px' }}>
        Delete
      </Button>
    )}

  </Box>
  );
};

export default VoteButton;
