// import Automata, { charToAutomata, parseToGraphviz } from "./Automata.js";

import Automata, { epsilonChar, parseToGraphviz } from "./Automata.js";
import { closure } from "./nfaTdfa.js";
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

// const A1 = thompsonConstruction('(0-9).(0-9)*', "NUMBER");
// const regex = 'i.n.t';
// const A2 = thompsonConstruction(regex, "INT");

const regex = '((A-Z)|(a-z)|(0-9))*';
const A1 = thompsonConstruction(regex);
const closureA2Init : number[] = closure(A1, 0);
console.log(closureA2Init);
console.log(parseToGraphviz(A1));

// console.log(regex);
// console.log(parseToGraphviz(A2));
// console.log(A1);
// console.log(closureA2Init);