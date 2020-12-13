import {readFileSync} from 'fs'
import path from "path"

const groups: string[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n\n")

function calcSumPart1() {
    let sum = 0
    for (const group of groups) {
        const map = new Map()
        group.split("\n")
            .flatMap(u => Array.from(u))
            .forEach(y => map.set(y, 1))
        sum += map.size
    }
    return sum;
}

let sum = calcSumPart1();
console.log(`Part 1: yes answer sum = ${sum}`)
