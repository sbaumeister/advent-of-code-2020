import {readFileSync} from 'fs'
import path from "path"

type Rotation = 'L' | 'R' | 'F';
type Direction = 'E' | 'S' | 'W' | 'N';
interface Instruction {
    action: Direction | Rotation
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
    const pos = directions.indexOf(currentDirection);
    const newPos = (pos + steps) % directions.length;
    return directions[newPos]
}

const position = {x: 0, y: 0}
let direction: Direction = 'E'
instructions.forEach(i => {
    if (i.action == 'L' || i.action == 'R') {
        direction = calcNewDirection(direction, i.action, i.value)
    }
    if (i.action == 'N' || i.action == 'F' && direction == 'N') {
        position.y += i.value
    }
    if (i.action == 'S'|| i.action == 'F' && direction == 'S') {
        position.y -= i.value
    }
    if (i.action == 'W'|| i.action == 'F' && direction == 'W') {
        position.x -= i.value
    }
    if (i.action == 'E'|| i.action == 'F' && direction == 'E') {
        position.x += i.value
    }
})

const absX = Math.abs(position.x);
const absY = Math.abs(position.y);
console.log(`Part 1: ${absX} + ${absY} = ${absX + absY}`)
