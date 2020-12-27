import {readFileSync} from 'fs'
import path from "path"

const originalLayout = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)

function applySeatingRules(layout: string[]): false | string[] {
    let stateChanged = false
    const newLayout: string[] = []
    for (let i = 0; i < layout.length; i++) {
        const row = layout[i]
        const prevRow = layout[i - 1]
        const nextRow = layout[i + 1]
        let newRow = row.repeat(1)
        for (let j = 0; j < row.length; j++) {
            const pos = row.charAt(j);
            if (pos == 'L') {
                let isAdjacentSeatOccupied = (prevRow && isAnySeatOccupied(prevRow.substr(j == 0 ? 0 : j - 1, 3)))
                    || isAnySeatOccupied(row.substr(j == 0 ? 0 : j - 1, 3))
                    || (nextRow && isAnySeatOccupied(nextRow.substr(j == 0 ? 0 : j - 1, 3)))
                if (!isAdjacentSeatOccupied) {
                    newRow = setCharAt(newRow, j, '#')
                    stateChanged = true
                }
            }
            if (pos == '#') {
                let countAdjacentOccupiedSeats = 0
                if (prevRow) {
                    prevRow.charAt(j - 1) == '#' && countAdjacentOccupiedSeats++
                    prevRow.charAt(j) == '#' && countAdjacentOccupiedSeats++
                    prevRow.charAt(j + 1) == '#' && countAdjacentOccupiedSeats++
                }
                row.charAt(j - 1) == '#' && countAdjacentOccupiedSeats++
                row.charAt(j + 1) == '#' && countAdjacentOccupiedSeats++
                if (nextRow) {
                    nextRow.charAt(j - 1) == '#' && countAdjacentOccupiedSeats++
                    nextRow.charAt(j) == '#' && countAdjacentOccupiedSeats++
                    nextRow.charAt(j + 1) == '#' && countAdjacentOccupiedSeats++
                }
                if (countAdjacentOccupiedSeats >= 4) {
                    newRow = setCharAt(newRow, j, 'L')
                    stateChanged = true
                }
            }
        }
        newLayout.push(newRow)
    }
    return stateChanged && newLayout
}

function isAnySeatOccupied(s: string) {
    return s.indexOf('#') != -1
}

function setCharAt(str: string, index: number, chr: string) {
    return str.substring(0, index) + chr + str.substring(index + 1);
}

let layout = originalLayout
let round = 1
while (true) {
    console.log(`Round ${round}...`)
    const result = applySeatingRules(layout)
    // console.log(result)
    if (result) {
        layout = result
    } else {
        break
    }
    round++
}
// console.log(layout)
const numberOfOccupiedSeats = layout.join('').match(/#/g)?.length || 0
console.log(`Part 1: number of occupied seats after stabilizing = ${numberOfOccupiedSeats}`)
