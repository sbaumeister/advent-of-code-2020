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

function calcSumPart2() {
    let sum = 0
    for (const group of groups) {
        const map = new Map<string, number>()
        const users = group.split("\n")
        users.flatMap(u => Array.from(u))
            .forEach(y => map.set(y, (map.get(y) || 0) + 1))
        for (const el of map) {
            if (el[1] == users.length) {
                sum++
            }
        }
        // console.log(`sum: ${sum}`)
    }
    return sum;
}

let sumPart1 = calcSumPart1();
console.log(`Part 1: sum any yes answers = ${sumPart1}`)

let sumPart2 = calcSumPart2();
console.log(`Part 2: sum common yes answers = ${sumPart2}`)
