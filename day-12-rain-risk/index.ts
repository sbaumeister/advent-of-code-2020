import {readFileSync} from 'fs'
import path from "path"

type Rotation = 'L' | 'R';
type Direction = 'E' | 'S' | 'W' | 'N';
interface Position {
    x: number
    y: number
}
interface Instruction {
    action: Direction | Rotation | 'F'
    value: number
}

// @ts-ignore
const instructions: Instruction[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)
    .map(s => ({action: s.substr(0, 1), value: parseInt(s.substr(1))}))

const directions: Direction[] = ['N', 'E', 'S', 'W']

function calcNewDirection(currentDirection: Direction, rotation: Rotation, value: number) {
    const degree = rotation == 'L' ? 360 - value : value
    const steps = degree / 90
    const idx = directions.indexOf(currentDirection);
    const newIdx = (idx + steps) % directions.length;
    return directions[newIdx]
}

function calcEndPositionPart1() {
    const position = {x: 0, y: 0}
    let direction: Direction = 'E'
    instructions.forEach(i => {
        if (i.action == 'L' || i.action == 'R') {
            direction = calcNewDirection(direction, i.action, i.value)
        }
        if (i.action == 'N' || i.action == 'F' && direction == 'N') {
            position.y += i.value
        }
        if (i.action == 'S' || i.action == 'F' && direction == 'S') {
            position.y -= i.value
        }
        if (i.action == 'W' || i.action == 'F' && direction == 'W') {
            position.x -= i.value
        }
        if (i.action == 'E' || i.action == 'F' && direction == 'E') {
            position.x += i.value
        }
    })
    position.x = Math.abs(position.x)
    position.y = Math.abs(position.y)
    return position;
}

function calcWaypointPositionAfterRotation(waypointPos: Position, rotation: Rotation, degree: number): Position {
    const degreeClockwise = rotation == 'L' ? 360 - degree : degree
    const steps = degreeClockwise / 90
    for (let i = 0; i < steps; i++) {
        const x = waypointPos.x
        const y = waypointPos.y
        waypointPos.x = y
        waypointPos.y = -x
    }
    return waypointPos
}

function calcEndPositionPart2() {
    let shipPosition = {x: 0, y: 0}
    let waypointPosition = {x: 10, y: 1}
    instructions.forEach(i => {
        if (i.action == 'L' || i.action == 'R') {
            waypointPosition = calcWaypointPositionAfterRotation(waypointPosition, i.action, i.value)
        }
        if (i.action == 'N') {
            waypointPosition.y += i.value
        }
        if (i.action == 'S') {
            waypointPosition.y -= i.value
        }
        if (i.action == 'W') {
            waypointPosition.x -= i.value
        }
        if (i.action == 'E') {
            waypointPosition.x += i.value
        }
        if (i.action == 'F') {
            shipPosition.x += i.value * waypointPosition.x
            shipPosition.y += i.value * waypointPosition.y
        }
    })
    shipPosition.x = Math.abs(shipPosition.x)
    shipPosition.y = Math.abs(shipPosition.y)
    return shipPosition;
}

const endPosPart1 = calcEndPositionPart1();
console.log(`Part 1: ${endPosPart1.x} + ${endPosPart1.y} = ${endPosPart1.x + endPosPart1.y}`)

const endPosPart2 = calcEndPositionPart2();
console.log(`Part 2: ${endPosPart2.x} + ${endPosPart2.y} = ${endPosPart2.x + endPosPart2.y}`)
