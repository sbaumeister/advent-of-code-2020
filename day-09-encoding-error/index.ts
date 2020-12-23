import {readFileSync} from 'fs'
import path from "path"

const numbers = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)
    .map(s => parseInt(s))

function findInvalidNumber() {
    nextNumber: for (let i = 25; i < numbers.length; i++) {
        for (let j = i - 25; j < i; j++) {
            for (let k = j + 1; k < i; k++) {
                if (numbers[j] + numbers[k] == numbers[i]) {
                    continue nextNumber
                }
            }
        }
        return i
    }
    throw new Error('Could not find invalid number')
}

const invalidNumberIdx = findInvalidNumber()
console.log(`Part 1: invalid number = ${numbers[invalidNumberIdx]} (index = ${invalidNumberIdx})`)
