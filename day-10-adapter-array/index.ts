import {readFileSync} from 'fs'
import path from "path"

const adapters = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .filter(s => s.length > 0)
    .map(s => parseInt(s))
    .sort((a, b) => a - b)
adapters.unshift(0)
adapters.push(adapters[adapters.length - 1] + 3)

let totalCountOneJoltDiffs = 0
let totalCountThreeJoltDiffs = 0
let countContiguousOneJoltDiffs = 0
let countValidAdapterChains = 1
for (let i = 1; i < adapters.length; i++) {
    const adapter = adapters[i]
    const prevAdapter = adapters[i - 1]
    const diff = adapter - prevAdapter;
    // console.log(diff)
    if (diff == 1) {
        totalCountOneJoltDiffs++
        countContiguousOneJoltDiffs++
    }
    if (diff == 3) {
        totalCountThreeJoltDiffs++
        if (countContiguousOneJoltDiffs == 4) {
            countValidAdapterChains *= 7
        }
        if (countContiguousOneJoltDiffs == 3) {
            countValidAdapterChains *= 4
        }
        if (countContiguousOneJoltDiffs == 2) {
            countValidAdapterChains *= 2
        }
        countContiguousOneJoltDiffs = 0
    }
}

console.log(`Part 1: ${totalCountOneJoltDiffs} * ${totalCountThreeJoltDiffs} = ${totalCountOneJoltDiffs * totalCountThreeJoltDiffs}`)
console.log(`Part 2: count valid adapter chains = ${countValidAdapterChains}`)
