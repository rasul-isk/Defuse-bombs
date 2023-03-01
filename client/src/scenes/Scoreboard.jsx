import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, colors } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';

const columns = [
  { field: 'name', headerName: 'Full Name', flex: 1 },
  { field: 'timer', headerName: 'Timer', flex: 0.5 },
  { field: 'date', headerName: 'Date', flex: 1 }, //, cellClassName: 'name-column--cell'
];
const Scoreboard = ({ usersData }) => {
  let [mode, setMode] = useState('Newbie');

  const toggleRight = () => {
    setMode((prev) => ({ Newbie: 'Skilled', Skilled: 'Crazy', Crazy: 'Newbie' }[prev]));
  };
  const toggleLeft = () => {
    setMode((prev) => ({ Skilled: 'Newbie', Crazy: 'Skilled', Newbie: 'Crazy' }[prev]));
  };

  return (
    <Box className="container-item" sx={{}} bgcolor={colors.red[500]} display="block" width="auto">
      {/* {DataParse} */}
      <HeaderTitle title={mode} />
      <Box display="inline-flex" alignItems="center" justifyContent={'space-between'}>
        <ChevronLeftIcon fontSize="large" sx={{ mr: '12px' }} onClick={toggleLeft} />

        <Box
          height="50vh"
          sx={{
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: '14px',
            },
            '& .MuiDataGrid-cell': {
              fontFamily: 'Sourcse Sans Pro, sans-serif',
              fontSize: '16px',
            },
          }}
        >
          <DataGrid rows={usersData[mode]} columns={columns} components={{ Toolbar: GridToolbar }} />
        </Box>
        <ChevronRightIcon fontSize="large" sx={{ ml: '12px' }} onClick={toggleRight} />
      </Box>
    </Box>
  );
};

export default Scoreboard;
