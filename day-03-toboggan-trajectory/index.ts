import {readFileSync} from 'fs'
import path from "path"

const rows: string[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n")

let bottomReached = false;
let x = 0;
let y = 0;
let countTrees = 0;

do {
    x += 3;
    y += 1;

    if (rows[y].length > 0) {

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

console.log(`Part 1: count trees = ${countTrees}`)
