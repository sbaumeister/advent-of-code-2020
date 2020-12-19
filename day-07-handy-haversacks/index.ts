import {readFileSync} from 'fs'
import path from "path"

interface Rule {
    name: string,
    childs: { count: number, name?: string }[]
}

const rules: Rule[] = readFileSync(path.resolve(__dirname, 'input.txt')).toString()
    .split('\n')
    .map(s => {
        const matches = s.match(/(?<bag>.+)\sbags contain\s(?<bags>.+)\./)
        const bag = matches?.groups?.bag || ''
        const bags = matches?.groups?.bags || ''
        const r: Rule = {
            name: bag,
            childs: []
        }
        const childBagMatches = bags.matchAll(/(?<count>[0-9]+) (?<name>[a-z ]+) bags?/g);
        for (const childBagMatch of childBagMatches) {
            r.childs.push({ count: parseInt(childBagMatch.groups?.count || ''), name: childBagMatch.groups?.name })
        }
        console.log(JSON.stringify(r))
        return r
    })
