import Automata, { charToAutomata, parseToGraphviz } from "./Automata.js";

const a : Automata = charToAutomata("x");
parseToGraphviz(a);
