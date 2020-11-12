import {sampleRate} from './consts'
const amplitude = 0.2
let x = 0

export function* waveGenerator(triggers) {
    while (true) {
        let sum = 0;
        Object.keys(triggers).forEach(id => {
            const {frequencyModulation} = triggers[id];
            
            sum += sineWave(x, frequencyModulation)
        })
        
        yield sum
        x++
    }
}


export const getMasterClock = () => x

const sineWave = (x, frequencyModulation) => Math.sin(Math.PI * 2 * (440 * frequencyModulation) * x / sampleRate) * amplitude