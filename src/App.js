import { CssBaseline, ThemeProvider } from '@mui/material'; //CssBaseline - resets CSS to defaults
import { useCallback, useEffect, useReducer, useState } from 'react';
import Difficulty from './scenes/Difficulty';
import { Game } from './scenes/Game';
import InfoBox from './scenes/InfoBox';
import Navigation from './scenes/Navigation';
import Shop from './scenes/Shop';
import { theme } from './theme';
// import { Routes, Route } from 'react-router-dom';
import { addOneSecond, bombCount } from './components/ProcessingMethods';
import Data from './data/DummyData';
import Scoreboard from './scenes/Scoreboard';
import Winner from './scenes/Winner';

const defaultSettings = {
  gameStatus: 'not started',
  difficulty: 'not chosen',
  timer: '00:00',
  history: {},
  map: {},
  flags: {},
  firstClick: '',
  gameOver: false,
  abilities: {
    status: 'not chosen',
    radar: 0,
    kamikaze: 0,
    fortune: 0,
  },
  activeAbility: '',
  cellsOnFocus: [],
};

const viewReducer = (prev, current) => {
  return {
    volume: { information: false, scoreboard: false, volume: !prev.volume, view: prev.view },
    information: { scoreboard: false, volume: prev.volume, information: !prev.information, view: (!prev.information && 'Infobox') || '' },
    scoreboard: { information: false, volume: prev.volume, scoreboard: !prev.scoreboard, view: (!prev.scoreboard && 'Scoreboard') || '' },
    nullify: { information: false, scoreboard: false, volume: prev.volume, view: '' },
  }[current.switch];
};

const gameInfoReducer = (prev, cur) => {
  return {
    gameStatus: { ...prev, gameStatus: cur.value }, //not started | started | paused | finished
    toggleGameStatus: { ...prev, gameStatus: prev['gameStatus'] === 'started' ? 'paused' : 'started' }, //not started | started | paused | finished
    difficulty: { ...prev, difficulty: cur.value },
    timer: { ...prev, timer: cur.value },
    countTime: { ...prev, timer: addOneSecond(prev['timer']) },
    history: { ...prev, history: cur.value },
    flags: { ...prev, flags: cur.value },
    addToHistory: { ...prev, history: { ...prev['history'], ...cur.value } },
    addToFlags: { ...prev, flags: { ...prev['flags'], ...cur.value } },
    map: { ...prev, map: cur.value },
    firstClick: { ...prev, firstClick: cur.value },
    gameOver: { ...prev, gameOver: cur.value },
    abilities: { ...prev, abilities: cur.value },
    useAbility: { ...prev, activeAbility: '', cellsOnFocus: [], abilities: { ...prev['abilities'], [cur.value]: prev['abilities'][cur.value] - 1 } },
    activeAbility: { ...prev, activeAbility: cur.value },
    cellsOnFocus: { ...prev, cellsOnFocus: cur.value },
    nullify: { ...defaultSettings },
  }[cur.switch];
};

function App() {
  const [commonUI, dispatchUI] = useReducer(viewReducer, {
    volume: false,
    information: false,
    scoreboard: false,
    view: '',
  });

  const [gameInfo, dispatchGame] = useReducer(gameInfoReducer, defaultSettings);
  const [usersScores, setUsersScores] = useState(Data); //MODIFY IT TO GET RESULTS FROM SCOREBOARD

  const musicURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';
  const [audio] = useState(new Audio(musicURL));
  audio.loop = true;
  audio.volume = 0.7;

  const renderMap = useCallback(() => {
    let size = { Newbie: 10, Skilled: 15, Crazy: 20 }[gameInfo.difficulty];
    let restFields = {};
    let bombs = {};

    while (Object.entries(bombs).length !== size) {
      let newBomb = [Math.floor(Math.random() * size) + 1, Math.floor(Math.random() * size) + 1].join('-');
      if (Object.entries(bombs).filter((el) => el !== newBomb && gameInfo.firstClick !== el)) bombs[newBomb] = 'X';
    }

    for (let y = 1; y <= size; y++) {
      for (let x = 1; x <= size; x++) {
        if (!bombs[`${x}-${y}`]) {
          restFields[`${x}-${y}`] = bombCount(bombs, `${x}-${y}`);
        }
      }
    }

    dispatchGame({ switch: 'map', value: { ...bombs, ...restFields } });
  }, [gameInfo.difficulty, gameInfo.firstClick]);

  const captureAbilities = useCallback(
    ([radar, kamikaze, fortune]) => {
      dispatchGame({ switch: 'abilities', value: { status: 'chosen', radar: radar, kamikaze: kamikaze, fortune: fortune } });
      if (Object.entries(gameInfo.map).length === 0) renderMap();
    },
    [gameInfo.map, renderMap]
  );

  useEffect(() => {
    if (gameInfo.difficulty === 'Crazy' && gameInfo.abilities.status !== 'chosen') captureAbilities([0, 0, 0]);
  }, [gameInfo.difficulty, captureAbilities, gameInfo.abilities.status]);

  useEffect(() => {
    //First click always safe implementation
    let historyArr = Object.entries(gameInfo.history);
    if (historyArr.length === 1 && historyArr[0][1] === 'game over') {
      dispatchGame({ switch: 'firstClick', value: historyArr[0][0] });
      dispatchGame({ switch: 'map', value: {} });
      renderMap();
      dispatchGame({ switch: 'history', value: { [historyArr[0][0]]: 'not hidden' } });
      dispatchGame({ switch: 'gameStatus', value: 'started' });
    }
  }, [gameInfo.history, renderMap]);

  useEffect(() => {
    commonUI.volume ? audio.play() : audio.pause();

    if (commonUI.view !== '' && gameInfo.gameStatus === 'started') dispatchGame({ switch: 'gameStatus', value: 'paused' });
  }, [commonUI.volume, commonUI.view, gameInfo.gameStatus, audio]);

  const togglePlay = () => {
    dispatchGame({ switch: 'toggleGameStatus' });
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
    dispatchUI({ switch: 'nullify' });
    dispatchGame({ switch: 'nullify' });
    dispatchGame({ switch: 'gameStatus', value: 'started' });
  };

  const showScoreBoard = () => {
    //When user won, scoreboard shown and game restarted
    dispatchUI({ switch: 'nullify' });
    dispatchGame({ switch: 'nullify' });
    dispatchUI({ switch: 'scoreboard' });
  };

  const insertName = (name) => {
    setUsersScores((prev) => ({ ...prev, [gameInfo.difficulty]: { ...prev[gameInfo.difficulty], [name]: gameInfo.timer } }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navigation commonUI={commonUI} dispatchUI={dispatchUI} gameInfo={gameInfo} restart={restart} togglePlay={togglePlay} />
        {commonUI.information && <InfoBox />}
        {commonUI.scoreboard && <Scoreboard usersData={usersScores} />}
        {commonUI.view === '' && gameInfo.gameStatus === 'started' && gameInfo.difficulty === 'not chosen' && <Difficulty dispatchGame={dispatchGame} />}
        {commonUI.view === '' && gameInfo.gameStatus === 'started' && gameInfo.difficulty !== 'not chosen' && gameInfo.difficulty !== 'Crazy' && gameInfo.abilities.status === 'not chosen' && (
          <Shop captureAbilities={captureAbilities} difficulty={gameInfo.difficulty} />
        )}
        {commonUI.view === '' && gameInfo.gameStatus !== 'paused' && gameInfo.abilities.status === 'chosen' && (gameInfo.gameOver === true || gameInfo.gameStatus !== 'finished') && (
          <Game gameInfo={gameInfo} dispatchGame={dispatchGame} />
        )}
        {commonUI.view === '' && gameInfo.gameOver === false && gameInfo.gameStatus === 'finished' && <Winner insertName={insertName} showScoreBoard={showScoreBoard} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
