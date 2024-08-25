import AutomataNFA  from "./Automata.js";
import { nfaTodfa } from "./nfaTdfa.js";
import thompsonConstruction, { automataJoin } from "./thompsonConstruction.js";
import { useDFA } from "./usageDFA.js";
import * as readline from "readline";

const allRegexs : [string, string][] = [
    ['i.n.t'                                    , 'INT'],
    ['s.t.r.i.n.g'                              , 'STR'],
    ['(0-9).(0-9)*'                             , 'NUM'],
    ['((a-z)|(A-Z)).((a-z)|(A-Z)*.(0-9)*)*'     , 'VAR'],
    ['".((((a-z)|(A-Z))*).(0-9)*)*."'           , 'CST'],
    ['+'                                        , 'ADD'],
    ['\\-'                                      , 'SUB'],
    ['\\*'                                      , 'MUL'],
    ['='                                        , 'EQU'],
    ['<'                                        , 'LTH'],
    ['>'                                        , 'GTH'],
    [';'                                        , 'SCN']
];

const automatas : AutomataNFA[] = allRegexs.map(
    val => thompsonConstruction(val[0], val[1])
);

const automataNFA = automataJoin(automatas);
const automataDFA = nfaTodfa(automataNFA);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

console.log("[READING]");
rl.on('line', (line) => {
    if(line !== "") {
        const to_print : string[] = [];
        for(const word of line.split(" ")) {
            to_print.push(`${useDFA(automataDFA, word)}`);
        }
        console.log(to_print.join(" "));
        if(line === ".exit") {
            process.exit();
        }
    } else {
        console.log("WARNNING :: NULL LINE");
    }
});
