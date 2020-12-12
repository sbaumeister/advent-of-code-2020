import {readFileSync} from 'fs'
import path from "path"

interface Passport {
    cid?: string
    ecl?: string
    iyr?: string
    eyr?: string
    byr?: string
    hgt?: string
    pid?: string
    hcl?: string
}

const passports: Passport[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split("\n\n")
    .map(s => {
        let p: any = {}
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

function isValidYear(value: string, min: number, max: number) {
    const matches = value.match(/[0-9]{4}/)
    if (matches) {
        const intVal = parseInt(value)
        return intVal >= min && intVal <= max
    }
    return false
}

function isValidHeight(value: string) {
    const matches = value.match(/([0-9]{3})(cm|in)/)
    if (matches) {
        const val = parseInt(matches[1])
        if (matches[2] == 'cm') {
            return val >= 150 && val <= 193
        }
        if (matches[2] == 'in') {
            return val >= 59 && val <= 76
        }
    }
    return false
}

function isValidHexColor(value: string) {
    return value.match(/#[0-9a-f]{6}/) !== null
}

function isValidEyeColor(value: string) {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(value) !== -1
}

function isValidPassportId(value: string) {
    return value.match(/[0-9]{9}/) !== null
}

function countValidPassportsPart2() {
    let countValidPassports = 0
    for (const passport of passports) {
        if (
            isValidYear(passport.byr || '', 1920, 2002) &&
            isValidYear(passport.iyr || '', 2010, 2020) &&
            isValidYear(passport.eyr || '', 2020, 2030) &&
            isValidHeight(passport.hgt || '') &&
            isValidHexColor(passport.hcl || '') &&
            isValidEyeColor(passport.ecl || '') &&
            isValidPassportId(passport.pid || '')
        ) {
            countValidPassports++
        }
    }
    return countValidPassports;
}

const countPart1 = countValidPassportsPart1();
console.log(`Part 1: count valid passports = ${countPart1}`)

const countPart2 = countValidPassportsPart2();
console.log(`Part 1: count valid passports = ${countPart2}`)
