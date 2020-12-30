import {readFileSync} from 'fs'
import path from "path"

const originalLayout = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)

function applySeatingRulesPart1(layout: string[]): { newLayout: string[]; stateChanged: boolean } {
    let stateChanged = false
    const newLayout: string[] = []
    for (let i = 0; i < layout.length; i++) {
        const row = layout[i]
        const prevRow = layout[i - 1]
        const nextRow = layout[i + 1]
        let newRow = row.repeat(1)
        for (let j = 0; j < row.length; j++) {
            const pos = row.charAt(j);
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
            if (pos == 'L' && countAdjacentOccupiedSeats == 0) {
                newRow = setCharAt(newRow, j, '#')
                stateChanged = true
            }
            if (pos == '#' && countAdjacentOccupiedSeats >= 4) {
                newRow = setCharAt(newRow, j, 'L')
                stateChanged = true
            }
        }
        newLayout.push(newRow)
    }
    return {newLayout, stateChanged}
}

function setCharAt(str: string, index: number, chr: string) {
    return str.substring(0, index) + chr + str.substring(index + 1);
}

let newLayout = originalLayout
let stateChanged = true
let round = 0
while (stateChanged) {
    console.log(`Round ${++round}...`);
    ({newLayout, stateChanged} = applySeatingRulesPart1(newLayout))
}
// console.log(layout)
const numberOfOccupiedSeats = newLayout.join('').match(/#/g)?.length || 0
console.log(`Part 1: number of occupied seats after stabilizing = ${numberOfOccupiedSeats}`)
