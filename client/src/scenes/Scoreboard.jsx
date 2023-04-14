import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, colors } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import HeaderTitle from '../components/HeaderTitle';

const columns = [
  { field: 'name', headerName: 'Full Name', flex: 1 },
  { field: 'timer', headerName: 'Timer', flex: 0.5 },
  { field: 'date', headerName: 'Date', flex: 1 }, //, cellClassName: 'name-column--cell'
];
const Scoreboard = () => {
  let [mode, setMode] = useState('Newbie');
  let [data, setData] = useState([]);
  let [displayData, setDisplayData] = useState([]);
  // id: 1,
  // name: 'John Doe',
  // timer: '08:23',
  // date: '2022-05-01',
  useEffect(() => {
    axios
      .get('http://localhost:5000/scores/show')
      .then((res) => {
        let data = res.data;
        data.sort((prev, cur) => cur.score - prev.score);
        for (let itr = 0; itr < data.length; itr++) {
          data[itr] = { id: data[itr]._id, name: data[itr].fullname, timer: data[itr].score, date: data[itr].date, difficulty: data[itr].difficulty };
        }
        console.log(data);
        setData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setDisplayData(data.filter((el) => el.difficulty === mode));
    // console.log('data' + Object.entries(displayData));
  }, [mode, data]);

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
          {console.log(displayData)}
          {displayData && <DataGrid rows={displayData} columns={columns} components={{ Toolbar: GridToolbar }} />}
        </Box>
        <ChevronRightIcon fontSize="large" sx={{ ml: '12px' }} onClick={toggleRight} />
      </Box>
    </Box>
  );
};

export default Scoreboard;
