import {readFileSync} from 'fs'
import path from "path"

const seats: string[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n")
    .filter(s => s.length > 0)

function binaryPartitioning(seatStr: string, charIdx: number, start: number, end: number): number {
    if (start == end) {
        return start
    }
    const op = seatStr.charAt(charIdx);
    const half = (end - start + 1) / 2
    if (op == 'F' || op == 'L') {
        return binaryPartitioning(seatStr, charIdx + 1, start, start + half - 1)
    } else if (op == 'B' || op == 'R') {
        return binaryPartitioning(seatStr, charIdx + 1, start + half, end)
    }
    return 0
}

function findMySeat(): { row: number, column: number } {
    for (let i = 0; i <= 127; i++) {
        const row = flight[i]
        for (let j = 0; j <= 7; j++) {
            const val = flight[i][j]
            if (val == 0) {
                const isRightSeatReserved = j + 1 <= 7 && row[j + 1] == 1
                const isLeftSeatReserved = j - 1 >= 0 && row[j - 1] == 1
                if (isRightSeatReserved && isLeftSeatReserved) {
                    return { row: i, column: j }
                }
            }
        }
    }
    throw new Error('Could not find my seat :(')
}

const flight : number[][] = new Array(128).fill(0).map(r => new Array(8).fill(0))
let highestSeatId = 0
for (const seat of seats) {
    const row = binaryPartitioning(seat, 0, 0, 127)
    const column = binaryPartitioning(seat, 7, 0, 7)
    flight[row][column] = 1
    const seatId = row * 8 + column
    // console.log(`row: ${row}, column: ${column}, seatId: ${seatId}`)
    if (seatId > highestSeatId) {
        highestSeatId = seatId
    }
}

console.log('Flight seat alloction table (0 = free, 1 = reserved):')
console.table(flight)
const mySeat = findMySeat();
console.log(`Part 1: Highest seatId = ${highestSeatId}`)
console.log(`Part 2: My seat = ${JSON.stringify(mySeat)}, my seatId = ${mySeat.row * 8 + mySeat.column}`)
