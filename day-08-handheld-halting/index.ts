import {readFileSync} from 'fs'
import path from "path"

interface Instruction {
    type: string
    value: number
}

const instructions = new Map<number, Instruction>()
readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)
    .forEach((s, i) => {
        instructions.set(i, {type: s.substr(0, 3), value: parseInt(s.substr(4))})
    })

function executeProgram(): boolean {
    let accumulator = 0
    let instructionPointer = 0
    const visitations = new Map<number,boolean>()
    let programTerminated = false
    console.log('--- START PROGRAM ---')
    while (true) {
        // console.log(instructionPointer)
        if (instructionPointer == instructions.size) {
            console.log(`Program terminated!`)
            console.log(`Part 2: accumulator = ${accumulator}`)
            programTerminated = true
            break;
        }
        const instruction = instructions.get(instructionPointer)
        if (!instruction) {
            throw new Error(`Instruction ${instructionPointer} not found`)
        }
        if (visitations.has(instructionPointer)) {
            console.log(`Loop: instruction ${instructionPointer} about to be visited twice`)
            console.log(`Part 1: accumulator = ${accumulator}`)
            programTerminated = false
            break;
        }
        visitations.set(instructionPointer, true)
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
    }
    console.log('--- END PROGRAM ---')
    return programTerminated
}

function switchInstructionType(instruction: Instruction) {
    if (instruction.type == 'nop') {
        instruction.type = 'jmp'
    } else if (instruction.type == 'jmp') {
        instruction.type = 'nop'
    }
}

function part2() {
    for (const [i, instruction] of instructions) {
        if (['nop', 'jmp'].indexOf(instruction.type) != -1) {
            console.log(`Switch instruction ${i}: original ${JSON.stringify(instruction)}`)
            switchInstructionType(instruction)
            console.log(`Switch instruction ${i}: first switch ${JSON.stringify(instruction)}`)
            if (executeProgram()) {
                break;
            }
            switchInstructionType(instruction)
            console.log(`Switch instruction ${i}: second switch ${JSON.stringify(instruction)}`)
        }
    }
}

// Part 1
executeProgram();

// Part2
part2();
