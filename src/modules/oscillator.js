import {sampleRate} from '../consts'

const amplitude = 1;
const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

export function getSineWave(x, frequency = 440) {
    const cyclicX = x % (~~(sampleRate / frequency));
    return Math.sin(frequency * twoPiDividedBySampleRate * cyclicX) * amplitude
}