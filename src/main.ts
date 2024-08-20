import Automata, { charToAutomata, parseToGraphviz } from "./Automata.js";
// import { automataSum } from "./thompsonConstruction.js";
import { automataConcat } from "./thompsonConstruction.js";


const A1 : Automata = charToAutomata('p');
const A2 : Automata = charToAutomata('e');
const A3 : Automata = charToAutomata('n');
const A4 : Automata = charToAutomata('i');
const A5 : Automata = charToAutomata('s');
const A6 : Automata = automataConcat(A1, automataConcat(A2, automataConcat(A3, automataConcat(A4, A5))));

console.log(parseToGraphviz(A6));

