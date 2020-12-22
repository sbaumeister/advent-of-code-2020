import {readFileSync} from 'fs'
import path from "path"

interface Instruction {
    type: string
    value: number
    visited: boolean
}

const instructions = new Map<number, Instruction>()
readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)
    .forEach((s, i) => {
        instructions.set(i, {type: s.substr(0, 3), value: parseInt(s.substr(4)), visited: false})
    })

let accumulator = 0
let instructionPointer = 0
while (true) {
    const instruction = instructions.get(instructionPointer)
    if (!instruction) {
        throw new Error(`Instruction ${instructionPointer} not found`)
    }
    if (instruction.visited) {
        console.log(`Part 1: accumulator = ${accumulator}`)
        break;
    }
    if (instruction.type == 'acc') {
        accumulator += instruction.value || 0
        instructionPointer++
    }
    if (instruction.type == 'jmp') {
        instructionPointer += instruction.value || 0
    }
    if (instruction.type == 'nop') {
        instructionPointer++
    }
    instruction.visited = true
}
