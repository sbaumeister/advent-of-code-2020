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

function findContiguousNumbersWithTargetSum(targetSum: number): number[] {
    outer: for (let i = 0; i < numbers.length; i++) {
        let sum = 0
        let result = []
        for (let j = i; j < numbers.length; j++) {
            sum += numbers[j]
            result.push(numbers[j])
            if (sum == targetSum) {
                return result
            }
            if (sum > targetSum) {
                continue outer
            }
        }
    }
    throw new Error('Could not find contiguous set of numbers')
}

const invalidNumberIdx = findInvalidNumber()
const invalidNumber = numbers[invalidNumberIdx];
console.log(`Part 1: invalid number = ${invalidNumber} (index = ${invalidNumberIdx})`)

const numberSet = findContiguousNumbersWithTargetSum(invalidNumber);
const max = Math.max(...numberSet);
const min = Math.min(...numberSet);
// console.log(numberSet)
console.log(`Part 2: smallest number = ${min}, largest number = ${max}, sum = ${min + max}`)
