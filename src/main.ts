// import { parseToGraphviz } from "./Automata.js";
import { _parseToGraphviz } from "./Automata.js";
import { nfaTodfa } from "./nfaTdfa.js";
import thompsonConstruction from "./thompsonConstruction.js";

const regex = '((a-b)|(A-B)).((a-b)|(A-B))*';
const automata = thompsonConstruction(regex);
console.log(nfaTodfa(automata));
console.log(_parseToGraphviz(nfaTodfa(automata)));
// console.log(nfaTodfa(automata));
// console.log(dfaEdge(automata, [4, 5], "a"));
// console.log(dfaEdge(automata, [4, 5], "b"));