import { CssBaseline, ThemeProvider } from '@mui/material'; //CssBaseline - resets CSS to defaults
import { useCallback, useEffect, useState } from 'react';
import Difficulty from './scenes/Difficulty';
import { Game } from './scenes/Game';
import InfoBox from './scenes/InfoBox';
import Navigation from './scenes/Navigation';
import Shop from './scenes/Shop';
import { theme } from './theme';
// import { Routes, Route } from 'react-router-dom';
import Data from './data/DummyData';
import Scoreboard from './scenes/Scoreboard';

const countValue = (bombs, xy) => {
  let [x, y] = xy.split('-').map((el) => ~~el);
  let possibilities = [`${x - 1}-${y}`, `${x}-${y - 1}`, `${x - 1}-${y - 1}`, `${x - 1}-${y + 1}`, `${x + 1}-${y}`, `${x}-${y + 1}`, `${x + 1}-${y + 1}`, `${x + 1}-${y - 1}`];
  // let sum = 0;
  // for (let itr = 0; itr < possibilities.length; itr++) console.log(bombs[possibilities[itr]] === 'X' ? `EXIST BOMB ${bombs[possibilities[itr]]}` : `NO BOMB ${bombs[possibilities]}`);

  return possibilities.reduce((prev, cur) => prev + (bombs[cur] ? 1 : 0), 0).toString();
};

function App() {
  const [play, setPlay] = useState('not started'); //not started | started | paused | finished
  const [difficulty, setDifficulty] = useState('not chosen');
  const [volume, setVolume] = useState(false);
  const [information, setInformation] = useState(false);
  const [scoreboard, setScoreboard] = useState(false);
  const [history, setHistory] = useState({});
  const [map, setMap] = useState({});
  const [firstClick, setFirstClick] = useState('');
  const [usersScores, setUsersScores] = useState(Data); //MODIFY IT TO GET RESULTS FROM SCOREBOARD
  const [abilities, setAbilities] = useState({
    status: 'not chosen',
    radar: 0,
    kamikaze: 0,
    fortune: 0,
  });
  const [timer, setTimer] = useState('00:00');

  const musicURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
  const [audio] = useState(new Audio(musicURL));
  audio.loop = true;
  audio.volume = 0.7;

  const renderMap = () => {
    let size = { Newbie: 10, Skilled: 15, Crazy: 20 }[difficulty];
    let restFields = {};
    let bombs = {};

    while (Object.entries(bombs).length !== size) {
      let newBomb = [Math.floor(Math.random() * size) + 1, Math.floor(Math.random() * size) + 1].join('-');
      if (Object.entries(bombs).filter((el) => el !== newBomb && firstClick !== el)) bombs[newBomb] = 'X';
    }

    for (let y = 1; y <= size; y++) {
      for (let x = 1; x <= size; x++) {
        if (!bombs[`${x}-${y}`]) {
          restFields[`${x}-${y}`] = countValue(bombs, `${x}-${y}`);
        }
      }
    }

    setMap({ ...bombs, ...restFields });
  };

  const captureAbilities = useCallback(
    ([radar, kamikaze, fortune]) => {
      setAbilities((prev) => ({ ...prev, status: 'chosen', radar: radar, kamikaze: kamikaze, fortune: fortune }));

      if (Object.entries(map).length === 0) renderMap();
    },
    [difficulty, map]
  );

  // console.log(Object.entries(map) + '\n\n\n\n');
  useEffect(() => {
    if (difficulty === 'Crazy' && abilities.status !== 'chosen') captureAbilities([0, 0, 0]);
  }, [difficulty, captureAbilities, abilities.status]);

  useEffect(() => {
    let historyArr = Object.entries(history);
    if (historyArr.length === 1 && historyArr[0][1] === 'game over') {
      setFirstClick(historyArr[0][0]);
      setMap({});
      renderMap();
      setHistory({ [historyArr[0][0]]: 'not hidden' });
      setPlay('started');
    }
  }, [history]);

  useEffect(() => {
    volume ? audio.play() : audio.pause();
  }, [volume, audio]);

  const togglePlay = (state) => {
    setPlay(state);
    setInformation(false);
    setScoreboard(false);
  };
  const toggleVolume = () => setVolume((prev) => !prev);
  const toggleScoreboard = () => {
    if (play === 'started') setPlay('paused');
    setInformation(false);
    setScoreboard((prev) => !prev);
  };
  const toggleInformation = () => {
    if (play === 'started') setPlay('paused');
    setScoreboard(false);
    setInformation((prev) => !prev);
  };

  const restart = () => {
    setPlay('started');
    setDifficulty('not chosen');
    setTimer('00:00');
    setAbilities({
      status: 'not chosen',
      radar: 0,
      kamikaze: 0,
      fortune: 0,
    });
    setMap({});
    setHistory({});
    setFirstClick('');
    setInformation(false);
    setScoreboard(false);
  };

  const useAbility = (ability) => {
    //USING ABILITY...
    setAbilities((prev) => ({ ...prev, [ability]: prev[ability] - 1 }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navigation
          timer={timer}
          difficulty={difficulty}
          information={information}
          play={play}
          restart={restart}
          volume={volume}
          scoreboard={scoreboard}
          togglePlay={togglePlay}
          toggleVolume={toggleVolume}
          toggleInformation={toggleInformation}
          toggleScoreboard={toggleScoreboard}
        />
        {information && <InfoBox />}
        {scoreboard && <Scoreboard usersData={usersScores} />}
        {play === 'started' && difficulty === 'not chosen' && <Difficulty setDifficulty={setDifficulty} />}
        {play === 'started' && difficulty !== 'not chosen' && difficulty !== 'Crazy' && abilities.status === 'not chosen' && <Shop captureAbilities={captureAbilities} difficulty={difficulty} />}
        {abilities.status !== 'not chosen' && (
          <Game
            firstClick={firstClick}
            setFirstClick={setFirstClick}
            map={map}
            play={play}
            setPlay={setPlay}
            difficulty={difficulty}
            timer={timer}
            setTimer={setTimer}
            abilities={abilities}
            useAbility={useAbility}
            history={history}
            setHistory={setHistory}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
