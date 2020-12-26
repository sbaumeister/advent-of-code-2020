import {readFileSync} from 'fs'
import path from "path"

let joltage = 0
let countOneJoltDiff = 0
let countThreeJoltDiff = 1

const adapters = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)
    .map(s => parseInt(s))
    .sort((a, b) => a - b)
    .forEach(a => {
        const diff = a - joltage
        // console.log(`adapter = ${a}, joltage = ${joltage}, diff = ${diff}`)
        if (diff <= 3) {
            diff == 1 && countOneJoltDiff++
            diff == 3 && countThreeJoltDiff++
        } else {
            throw new Error('Could not find adpater chain')
        }
        joltage = a
    })

console.log(`Part 1: ${countOneJoltDiff} * ${countThreeJoltDiff} = ${countOneJoltDiff * countThreeJoltDiff}`)
