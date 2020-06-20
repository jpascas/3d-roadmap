import { loadState, saveState } from './localStorage.js'


function setUserPreferences(userInfo) {
  saveState(userInfo);
}

function GetUserPreferences(side) {

  const defaultPreference = {
    frontEnd: {
      rotation: [0, Math.PI, 0],
    },
    backEnd: {
      rotation: [Math.PI, 0, 0],
    },
  };
  // let preferencesFromLocal = loadState().car;
  let preferencesFromLocal = {
    "frontEnd": {
      position: [0, 0.205, 1],        
      color: 'black'
    },
    "backEnd": {
      position: [0, -10.205, 1],        
      color: 'yellow'
    }
  };

  Object.assign(preferencesFromLocal.frontEnd, defaultPreference.frontEnd);
  Object.assign(preferencesFromLocal.backEnd, defaultPreference.backEnd);

  const data = side === "frontEnd" ? preferencesFromLocal.frontEnd : preferencesFromLocal.backEnd;
  console.log("side: ", side);
  console.log("preference for side:", data);
  
  return data;
}

export { setUserPreferences, GetUserPreferences };
