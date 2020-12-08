import {readFileSync} from 'fs'
import path from "path"

const rows: string[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n")

function traverseMap(right: number, down: number): number {
    let bottomReached = false;
    let x = 0;
    let y = 0;
    let countTrees = 0;

    do {
        x += right;
        y += down;

        if (rows[y] && rows[y].length > 0) {

            if (rows[y].charAt(x) === '') {
                x = x - rows[y].length;
            }
            if (rows[y].charAt(x) === '#') {
                // console.log(`# Tree at y = ${y}, x = ${x}`)
                countTrees++;
            } else {
                // console.log(`. NO tree at y = ${y}, x = ${x}`)
            }

        } else {
            bottomReached = true;
        }

    } while (!bottomReached)

    return countTrees;
}

const countTreesPart1 = traverseMap(3, 1);
console.log(`Part 1: count trees = ${countTreesPart1}`)

const resultPart2 = countTreesPart1 * traverseMap(1, 1) * traverseMap(5, 1)
    * traverseMap(7, 1) * traverseMap(1, 2)
console.log(`Part 2: result = ${resultPart2}`)
