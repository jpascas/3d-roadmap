import React, { useRef } from 'react';
import useEventListener from '@use-it/event-listener';
import { useFrame } from 'react-three-fiber';
import Car from './car.component.jsx';
import { GetUserPreferences } from '../../service/userPreferenceService';

const CarControls = ({side, locked}) => {
  const group = useRef();
  const keyPresses = {};

  const handleKeyDown = (e) => {
    if (!keyPresses[e.key]) {
      keyPresses[e.key] = new Date().getTime();
    }
  };

  const handleKeyUp = (e) => {
    delete keyPresses[e.key];
  };

  useEventListener('keydown', handleKeyDown);
  useEventListener('keyup', handleKeyUp);

  
  useFrame(() => {
    // move camera according to key presses
    if(locked) return

    Object.entries(keyPresses).forEach((e) => {
      const [key] = e;
      switch (key) {
        case 'ArrowUp': 
          group.current.position.z -= 0.1; 
          break;
        case 'ArrowDown': 
          group.current.position.z += 0.1; 
          break;
        default:
      }
    });
  });

  const data = GetUserPreferences(side);

  return (
    <group ref={group} name={side}>
      <Car {...data} />
    </group>
  )
}

export default CarControls;
