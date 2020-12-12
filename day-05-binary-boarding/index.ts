import {readFileSync} from 'fs'
import path from "path"

const seats: string[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n")
    .filter(s => s.length > 0)

let highestSeatId = 0
for (const seat of seats) {
    const row = binaryPartitioning(seat, 0, 0, 127)
    const column = binaryPartitioning(seat, 7, 0, 7)
    const seatId = row * 8 + column
    console.log(`row: ${row}, column: ${column}, seatId: ${seatId}`)
    if (seatId > highestSeatId) {
        highestSeatId = seatId
    }
}

console.log(`Part 1: Highest seatId = ${highestSeatId}`)

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
