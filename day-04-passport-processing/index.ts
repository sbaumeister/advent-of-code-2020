import {readFileSync} from 'fs'
import path from "path"

interface Passport {
    cid: string
    ecl: string
    iyr: string
    eyr: string
    byr: string
    hgt: string
    pid: string
    hcl: string
}

const passports: Passport[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n\n")
    .map(s => {
        let p : any = {}
        const matches = s.matchAll(/(?<field>[a-z]{3}):(?<value>[^\s]+)/g)
        for (const match of matches) {
            if (match.groups?.field !== undefined) {
                p[match.groups.field] = match.groups?.value
            }
        }
        return p
    })

function countValidPassportsPart1() {
    let countValidPassports = 0
    for (const passport of passports) {
        let fieldCount = 0
        let containsCid = false
        for (const field in passport) {
            if (field == 'cid') {
                containsCid = true
            }
            fieldCount++
        }
        if (fieldCount == 8 || (fieldCount == 7 && !containsCid)) {
            countValidPassports++
            // console.log(`+ Valid passport: ${JSON.stringify(passport)}`)
        } else {
            // console.log(`- Invalid passport: ${JSON.stringify(passport)}`)
        }
    }
    return countValidPassports;
}

let countValidPassports = countValidPassportsPart1();
console.log(`Part 1: count valid passports = ${countValidPassports}`)
