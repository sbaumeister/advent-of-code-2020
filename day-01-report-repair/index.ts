import {readFileSync} from 'fs'
import path from "path"

const numbers : number[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n")
    .filter(s => s.length > 0)
    .map(n => parseInt(n))

function findNumbersPart1(): { n1: number, n2: number } {
    for (let k1 in numbers) {
        let n1 = numbers[k1];
        for (let k2 in numbers) {
            if (k1 === k2) {
                continue
            }
            let n2 = numbers[k2];
            if (n1 + n2 === 2020) {
                return { n1: n1, n2: n2}
            }
        }
    }
    throw new Error("Found no number pair that sum to 2020")
}

function findNumbersPart2(): {n1: number, n2: number, n3: number} {
    for (let k1 in numbers) {
        let n1 = numbers[k1];
        for (let k2 in numbers) {
            if (k1 === k2) {
                continue
            }
            let n2 = numbers[k2];
            for (let k3 in numbers) {
                if (k3 === k2 || k3 === k1) {
                    continue;
                }
                let n3 = numbers[k3];
                if (n1 + n2 + n3 === 2020) {
                    return { n1: n1, n2: n2, n3: n3}
                }
            }
        }
    }
    throw new Error("Found no number pair that sum to 2020")
}

const { n1: n1Part1, n2: n2Part1 } = findNumbersPart1();
console.log(`Part 1: ${n1Part1} * ${n2Part1} = ${n1Part1 * n2Part1}`)

const { n1: n1Part2, n2: n2Part2, n3: n3Part2 } = findNumbersPart2();
console.log(`Part 2: ${n1Part2} * ${n2Part2} * ${n3Part2} = ${n1Part2 * n2Part2 * n3Part2}`)
