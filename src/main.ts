import Automata, { charToAutomata, parseToGraphviz } from "./Automata.js";
// import { automataSum } from "./thompsonConstruction.js";
import { automataSum } from "./thompsonConstruction.js";


const A1 : Automata = charToAutomata('🐒');
const A2 : Automata = charToAutomata('🦻');
const A4 : Automata = charToAutomata('🪀');
const A3 : Automata = automataSum(A1, A2);
const A5 : Automata = automataSum(A3, A4);

console.log(parseToGraphviz(A5));

