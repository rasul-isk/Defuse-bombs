import { CssBaseline, ThemeProvider } from '@mui/material'; //CssBaseline - resets CSS to defaults
import { useCallback, useEffect, useReducer, useState } from 'react';
import Difficulty from './scenes/Difficulty';
import { Game } from './scenes/Game';
import InfoBox from './scenes/InfoBox';
import Navigation from './scenes/Navigation';
import Shop from './scenes/Shop';
import { theme } from './theme';
// import { Routes, Route } from 'react-router-dom';
import Data from './data/DummyData';
import Scoreboard from './scenes/Scoreboard';
import Winner from './scenes/Winner';

const countValue = (bombs, xy) => {
  let [x, y] = xy.split('-').map((el) => ~~el);
  let possibilities = [`${x - 1}-${y}`, `${x}-${y - 1}`, `${x - 1}-${y - 1}`, `${x - 1}-${y + 1}`, `${x + 1}-${y}`, `${x}-${y + 1}`, `${x + 1}-${y + 1}`, `${x + 1}-${y - 1}`];
  return possibilities.reduce((prev, cur) => prev + (bombs[cur] ? 1 : 0), 0).toString();
};

const viewReducer = (prevState, curAction) => {
  return {
    volume: { information: false, scoreboard: false, volume: !prevState.volume, view: prevState.view },
    information: { scoreboard: false, volume: prevState.volume, information: !prevState.information, view: (!prevState.information && 'Infobox') || '' },
    scoreboard: { information: false, volume: prevState.volume, scoreboard: !prevState.scoreboard, view: (!prevState.scoreboard && 'Scoreboard') || '' },
    nullify: { information: false, scoreboard: false, volume: prevState.volume, view: '' },
  }[curAction.switch];
};

function App() {
  //none
  //Infobox | information
  //Scoreboard | scoreboard
  //Difficulty | play === 'started' && difficulty === 'not chosen'
  //Shop | play === 'started' && difficulty !== 'not chosen' && difficulty !== 'Crazy' && abilities.status === 'not chosen'
  //Game start | play !== 'paused' && abilities.status !== 'not chosen' && (gameOver === true || play !== 'finished')
  //Winner | gameOver === false && play === 'finished'

  //view param added how to implement?
  //Game status - play
  const [gameStatus, setGameStatus] = useState('not started'); //not started | started | paused | finished

  const [commonUI, dispatchUI] = useReducer(viewReducer, {
    volume: false,
    information: false,
    scoreboard: false,
    view: '',
  });

  // const [volume, setVolume] = useState(false);
  // const [information, setInformation] = useState(false);
  // const [scoreboard, setScoreboard] = useState(false);

  const [difficulty, setDifficulty] = useState('not chosen');
  const [history, setHistory] = useState({});
  const [map, setMap] = useState({});
  const [firstClick, setFirstClick] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [abilities, setAbilities] = useState({
    status: 'not chosen',
    radar: 0,
    kamikaze: 0,
    fortune: 0,
  });

  const [usersScores, setUsersScores] = useState(Data); //MODIFY IT TO GET RESULTS FROM SCOREBOARD

  const [timer, setTimer] = useState('00:00');

  const musicURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
  const [audio] = useState(new Audio(musicURL));
  audio.loop = true;
  audio.volume = 0.7;

  const renderMap = useCallback(() => {
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
  }, [difficulty, firstClick]);

  const captureAbilities = useCallback(
    ([radar, kamikaze, fortune]) => {
      setAbilities((prev) => ({ ...prev, status: 'chosen', radar: radar, kamikaze: kamikaze, fortune: fortune }));

      if (Object.entries(map).length === 0) renderMap();
    },
    [map, renderMap]
  );

  // console.log(Object.entries(map) + '\n\n\n\n');
  useEffect(() => {
    if (difficulty === 'Crazy' && abilities.status !== 'chosen') captureAbilities([0, 0, 0]);
  }, [difficulty, captureAbilities, abilities.status]);

  useEffect(() => {
    //First click always safe implementation
    let historyArr = Object.entries(history);
    if (historyArr.length === 1 && historyArr[0][1] === 'game over') {
      setFirstClick(historyArr[0][0]);
      setMap({});
      renderMap();
      setHistory({ [historyArr[0][0]]: 'not hidden' });
      setGameStatus('started');
    }
  }, [history, renderMap]);

  useEffect(() => {
    commonUI.volume ? audio.play() : audio.pause();
  }, [commonUI.volume, audio]);
  useEffect(() => {
    if (commonUI.view !== '' && gameStatus === 'started') setGameStatus('paused');
  }, [commonUI.view]);

  const togglePlay = (state) => {
    setGameStatus(state);
    dispatchUI({ switch: 'nullify' });
  };
  
  /*
  When u had multiple states   
  const toggleVolume = () => setVolume((prev) => !prev);
  const toggleScoreboard = () => {
    if (gameStatus === 'started') setGameStatus('paused');
    setInformation(false);
    setScoreboard((prev) => !prev);
  };
  const toggleInformation = () => {
    if (gameStatus === 'started') setGameStatus('paused');
    setScoreboard(false);
    setInformation((prev) => !prev);
  }; */

  const restart = () => {
    setGameStatus('started');
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
    dispatchUI({ switch: 'nullify' });
  };

  const showScoreBoard = () => {
    //When user won, scoreboard shown and game restarted
    restart();
    setGameStatus('not started');
    dispatchUI({ switch: 'nullify' });
    dispatchUI({ switch: 'scoreboard' });
  };

  const useAbility = (ability) => {
    //USING ABILITY...
    setAbilities((prev) => ({ ...prev, [ability]: prev[ability] - 1 }));
  };

  const insertName = (name) => {
    setUsersScores((prev) => ({ ...prev, [difficulty]: { ...prev[difficulty], [name]: timer } }));
  };

  // console.log(usersScores);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navigation
          timer={timer}
          difficulty={difficulty}
          commonUI={commonUI}
          dispatchUI={dispatchUI}
          gameStatus={gameStatus}
          restart={restart}
          // volume={volume}
          // scoreboard={scoreboard}
          togglePlay={togglePlay}
          // toggleVolume={toggleVolume}
          // toggleInformation={toggleInformation}
          // toggleScoreboard={toggleScoreboard}
        />
        {commonUI.information && <InfoBox />}
        {commonUI.scoreboard && <Scoreboard usersData={usersScores} />}
        {commonUI.view === '' && gameStatus === 'started' && difficulty === 'not chosen' && <Difficulty setDifficulty={setDifficulty} />}
        {commonUI.view === '' && gameStatus === 'started' && difficulty !== 'not chosen' && difficulty !== 'Crazy' && abilities.status === 'not chosen' && (
          <Shop captureAbilities={captureAbilities} difficulty={difficulty} />
        )}
        {commonUI.view === '' && gameStatus !== 'paused' && abilities.status !== 'not chosen' && (gameOver === true || gameStatus !== 'finished') && (
          <Game
            firstClick={firstClick}
            gameOver={gameOver}
            setGameOver={setGameOver}
            setFirstClick={setFirstClick}
            map={map}
            gameStatus={gameStatus}
            setGameStatus={setGameStatus}
            difficulty={difficulty}
            timer={timer}
            setTimer={setTimer}
            abilities={abilities}
            useAbility={useAbility}
            history={history}
            setHistory={setHistory}
          />
        )}
        {commonUI.view === '' && gameOver === false && gameStatus === 'finished' && <Winner insertName={insertName} showScoreBoard={showScoreBoard} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
