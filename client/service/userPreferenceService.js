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
  let userInfo = loadState();
  let carPreferences;
  if (!userInfo || userInfo.hasOwnProperty("notSignedIn") || !userInfo.car) {
    console.log("Not signed default info");
    carPreferences = {
      "frontEnd": {
        position: [0, 0.205, 1],
        color: 'purple'
      },
      "backEnd": {
        position: [0, -10.205, 1],
        color: 'white'
      }
    };
  } else {
    console.log("its signed: ", userInfo.car);
    carPreferences = userInfo.car;
  }

  Object.assign(carPreferences.frontEnd, defaultPreference.frontEnd);
  Object.assign(carPreferences.backEnd, defaultPreference.backEnd);

  const data = side === "frontEnd" ? carPreferences.frontEnd : carPreferences.backEnd;
  console.log("side: ", side);
  console.log("preference for side:", data);
  
  return data;
}

export { setUserPreferences, GetUserPreferences };
