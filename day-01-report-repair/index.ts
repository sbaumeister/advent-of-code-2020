import {readFile} from 'fs'
import path from "path";

readFile(path.resolve(__dirname, 'input.txt'), (err, data) => {
    console.log(data);
});
