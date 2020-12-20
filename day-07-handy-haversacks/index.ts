import {readFileSync} from 'fs'
import path from "path"

const rawRules: string[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
type Bag = { count: number, name: string };
const ruleMap = new Map<string, Bag[]>()
for (const r of rawRules) {
    const ruleMatches = r.match(/(?<color>.+)\sbags contain\s(?<bags>.+)\./)
    const color = ruleMatches?.groups?.color || ''
    const rawBags = ruleMatches?.groups?.bags || ''
    const bagMatches = rawBags.matchAll(/(?<count>[0-9]+) (?<name>[a-z ]+) bags?/g);
    const bags = []
    for (const bagMatch of bagMatches) {
        bags.push({
            count: parseInt(bagMatch.groups?.count || ''),
            name: bagMatch.groups?.name || ''
        })
    }
    ruleMap.set(color, bags)
    // console.log(JSON.stringify(r))
}

function containsShinyGold(bags: Bag[]): boolean {
    if (bags.map(c => c.name).indexOf('shiny gold') !== -1) {
        return true
    }
    for (const bag of bags) {
        if (containsShinyGold(ruleMap.get(bag.name) || [])) {
            return true
        }
    }
    return false
}

function findColorsContaininggShinyGold() {
    const resultSet = new Set()
    for (const [color, bags] of ruleMap) {
        if (containsShinyGold(bags)) {
            resultSet.add(color)
        }
    }
    return resultSet;
}

function countBagsInsideShinyGold() {
    const shinyGoldBags = ruleMap.get('shiny gold') || []
    function countRecursive(bags: Bag[]): number {
        let count = 0
        for (const bag of bags) {
            count += bag.count
            count += bag.count * countRecursive(ruleMap.get(bag.name) || [])
        }
        return count
    }
    return countRecursive(shinyGoldBags)
}

const colorsContainingShinyGold = findColorsContaininggShinyGold();
console.log(`Part 1: ${colorsContainingShinyGold.size} colors contain shiny gold`)

console.log(`Part 2: ${countBagsInsideShinyGold()} bags inside shiny gold`)
