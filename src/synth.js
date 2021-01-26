import {sampleRate, releaseSize} from './consts'
import {getTriggers} from './input/KeyboardManager'

const amplitude = 1;
let masterClock = 0;


export const getMasterClock = () => masterClock
export const increament = (x) => masterClock++

export function* waveGenerator() {
    while(true) {
      masterClock++;
      const inputs = createInputsFromTriggers()
      let wave = 0;
      inputs.forEach(({frequencyModulation}) => {
        wave += getSineWave(masterClock, 440 * frequencyModulation)
      })

      // Decrease volume until I will make a master volume component
      const mixVolume =  0.3;
      yield wave * mixVolume
    }
  }

const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

export function getSineWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));
  return Math.sin(frequency * twoPiDividedBySampleRate * cyclicX) * amplitude
}

export const createInputsFromTriggers = () => {
  const inputs = []
  const x = masterClock
  const triggers = getTriggers()

  Object.keys(triggers).forEach(id => {
      const trigger = triggers[id];

      if(!triggers[id]) return;

      const {frequencyModulation, shouldGenerate, xAtStart, xAtStop} = trigger;
      let y = 1;

      if (!shouldGenerate) {
          y = 0;
          if ((x - xAtStop) >= releaseSize) {
          
          delete triggers[id];
          return 
          }
      } 
  inputs.push({y, xAtStart, xAtStop, frequencyModulation})
  });

  return inputs
}