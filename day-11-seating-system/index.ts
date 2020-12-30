import {readFileSync} from 'fs'
import path from "path"

const originalLayout = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)

type ApplyRulesResult = { newLayout: string[], stateChanged: boolean };

function applySeatingRulesPart1(layout: string[]): ApplyRulesResult {
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

function applySeatingRulesPart2(layout: string[]): ApplyRulesResult {
    let stateChanged = false
    const newLayout: string[] = []
    for (let i = 0; i < layout.length; i++) {
        const row = layout[i]
        let newRow = row.repeat(1)
        for (let j = 0; j < row.length; j++) {
            const pos = row.charAt(j);
            let countAdjacentOccupiedSeats = 0
            if (layout[i - 1]) {
                getVisibleSeat(layout, [i, j], (i, j) => [i - 1, j - 1]) == '#' && countAdjacentOccupiedSeats++
                getVisibleSeat(layout, [i, j], (i, j) => [i - 1, j]) == '#' && countAdjacentOccupiedSeats++
                getVisibleSeat(layout, [i, j], (i, j) => [i - 1, j + 1]) == '#' && countAdjacentOccupiedSeats++
            }
            getVisibleSeat(layout, [i, j], (i, j) => [i, j - 1]) == '#' && countAdjacentOccupiedSeats++
            getVisibleSeat(layout, [i, j], (i, j) => [i, j + 1]) == '#' && countAdjacentOccupiedSeats++
            if (layout[i + 1]) {
                getVisibleSeat(layout, [i, j], (i, j) => [i + 1, j - 1]) == '#' && countAdjacentOccupiedSeats++
                getVisibleSeat(layout, [i, j], (i, j) => [i + 1, j]) == '#' && countAdjacentOccupiedSeats++
                getVisibleSeat(layout, [i, j], (i, j) => [i + 1, j + 1]) == '#' && countAdjacentOccupiedSeats++
            }
            if (pos == 'L' && countAdjacentOccupiedSeats == 0) {
                newRow = setCharAt(newRow, j, '#')
                stateChanged = true
            }
            if (pos == '#' && countAdjacentOccupiedSeats >= 5) {
                newRow = setCharAt(newRow, j, 'L')
                stateChanged = true
            }
        }
        newLayout.push(newRow)
    }
    return {newLayout, stateChanged}
}

function getVisibleSeat(layout: string[], startPos: [number, number], nextPos: (i: number, j: number) => [number, number]) {
    let [i, j] = startPos
    let pos;
     do {
        [i, j] = nextPos(i, j)
        pos = layout[i]?.charAt(j);
        if (pos == 'L' || pos == '#') {
            return pos
        }
    } while (pos)
}

function setCharAt(str: string, index: number, chr: string) {
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function applyRulesUntilStabilization(seatingRuleFunc: (layout: string[]) => ApplyRulesResult) {
    let newLayout = originalLayout
    let stateChanged = true
    let round = 0
    while (stateChanged) {
        round++;
        // console.log(`Round ${round}...`);
        ({newLayout, stateChanged} = seatingRuleFunc(newLayout))
    }
    return newLayout;
}

let finalLayoutPart1 = applyRulesUntilStabilization(applySeatingRulesPart1);
const numberOfOccupiedSeatsPart1 = finalLayoutPart1.join('').match(/#/g)?.length || 0
console.log(`Part 1: number of occupied seats after stabilizing = ${numberOfOccupiedSeatsPart1}`)

let finalLayoutPart2 = applyRulesUntilStabilization(applySeatingRulesPart2);
const numberOfOccupiedSeatsPart2 = finalLayoutPart2.join('').match(/#/g)?.length || 0
console.log(`Part 2: number of occupied seats after stabilizing = ${numberOfOccupiedSeatsPart2}`)
