import {readFileSync} from 'fs'
import path from "path"

const numbers : number[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n")
    .filter(s => s.length > 0)
    .map(n => parseInt(n))

type Result = { number1: number, number2: number };

function findNumbers(): Result {
    for (let k1 in numbers) {
        let n1 = numbers[k1];
        for (let k2 in numbers) {
            if (k1 === k2) {
                continue
            }
            let n2 = numbers[k2];
            if (n1 + n2 === 2020) {
                return { number1: n1, number2: n2}
            }
        }
    }
    throw new Error("Found no number pair that sum to 2020")
}

const { number1, number2 } = findNumbers();
console.log(`${number1} * ${number2} = ${number1 * number2}`)

