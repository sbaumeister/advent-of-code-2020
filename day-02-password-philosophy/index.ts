import {readFileSync} from 'fs'
import path from "path"

type Entry = { char: string, min: number, max: number, password: string }

const entries: Entry[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n")
    .filter(s => s.length > 0)
    .map(s => {
        const val = s.split(' ');
        const range = val[0].split('-').map(n => parseInt(n));
        return {char: val[1].charAt(0), min: range[0], max: range[1], password: val[2]}
    })

function countValidPasswordsPart1() {
    let countValid = 0;
    entries.forEach(e => {
        const matches = e.password.match(new RegExp(e.char, 'g')) || []
        if (matches.length >= e.min && matches.length <= e.max) {
            countValid++;
        }
    });
    return countValid;
}

function countValidPasswordsPart2() {
    let countValid = 0;
    entries.forEach(e => {
        const charAtMin = e.password.charAt(e.min - 1);
        const charAtMax = e.password.charAt(e.max - 1);
        if (charAtMin != charAtMax && (charAtMin == e.char || charAtMax == e.char)) {
            countValid++;
        }
    });
    return countValid;
}

const countPart1 = countValidPasswordsPart1();
console.log(`Part 1: count valid passwords = ${countPart1}`)

const countPart2 = countValidPasswordsPart2();
console.log(`Part 2: count valid passwords = ${countPart2}`)
