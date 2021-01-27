import {getTriggers} from './input/KeyboardManager'
import {getSineWave} from './modules/oscillator'

let masterClock = 0;

export const getMasterClock = () => masterClock

export function* waveGenerator() {
    while(true) {   
      const triggers = getTriggers()
      let wave = 0;

      Object.keys(triggers).forEach((id) => {
        const {frequencyModulation, shouldGenerate} = triggers[id]

        if (!shouldGenerate) return;
        wave += getSineWave(masterClock, 440 * frequencyModulation)
      })

      // Decrease volume 
      const mixVolume =  0.3
      yield wave * mixVolume

      masterClock++
    }
  }