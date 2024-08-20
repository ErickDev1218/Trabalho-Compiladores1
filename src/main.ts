// import Automata, { charToAutomata, parseToGraphviz } from "./Automata.js";

import { parseToGraphviz } from "./Automata.js";
import thompsonConstruction from "./thompsonConstruction.js";



// const A1 : Automata = charToAutomata('p');
// const A2 : Automata = charToAutomata('e');
// const A3 : Automata = charToAutomata('n');
// const A4 : Automata = charToAutomata('i');
// const A5 : Automata = charToAutomata('s');
// const A6 : Automata = automataConcat(A1, automataConcat(A2, automataConcat(A3, automataConcat(A4, A5))));

// const Test : Automata = charToAutomata('a');
// const Test1 : Automata = charToAutomata('b');

// const final : Automata = automataKleene(Test);
// const final1 : Automata = automataKleene(Test1);


// console.log(parseToGraphviz(automataSum(final,final1)));

const regex = '(0-9)*';
console.log(parseToGraphviz(thompsonConstruction(regex)));