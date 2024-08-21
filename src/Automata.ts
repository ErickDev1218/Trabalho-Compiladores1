type Transition = {
    state: number,
    char : string
}

const epsilonChar : string = 'ε';

function stringToTrasition(str : string) : Transition {
    const commaPos : number = str.indexOf(",");
    if(commaPos === -1) {
        throw new Error("stringToTransition :: No comma find");
    }
    const state = parseInt(str.substring(0, commaPos));
    if(isNaN(state)) {
        throw new Error("stringToTransition :: State is not a number");
    }
    return {
        state,
        char: str.substring(commaPos+1, str.length)
    };
}

type Automata = {
    size: number, /*size = 2 -> state0, state1*/
    initState: number,
    finalStates: number[],
    outState: string[],
    transitions: Map<string, number[]>
}

// function charToAutomata(char : string) : Automata {
//     const transitions = new Map<[number, string], number[]>;
//     transitions.set([0, char], [1]);

//     return {
//         size: 2,
//         initState: 0,
//         finalStates: [1],
//         outState: [ epsilonChar, char ],
//         transitions 
//     };
// }

// * Copy transitions A1 <- A2 with offset = x on states
// function mergeAutomatas(A1: Automata, A2: Automata, offset : number){
//     for(const [key, value] of A2.transitions) {
//         A1.transitions.set([key[0]+offset, key[1]], value.map(value => value+offset));
//     }
//     for(let i = offset; i < A1.size; i++) {
//         if (!A1.outState[i]) {
//             A1.outState[i] = A2.outState[i-offset];
//         }
//     }
// }

const graphVizTemplate = `
digraph G {
graph [ dpi = 300 ]; 
node [ shape = "circle" ]
A [style=invis]
`;

function parseToGraphviz(a : Automata, showNums : boolean = true) : string {
    let out = graphVizTemplate;
    for(let i = 0; i < a.size; i++) {
        if(i === a.initState) {
            out += `${i}[label="${showNums ? i : a.outState[i]}"]\n`;
            out += `A -> ${i}\n`;
        } else if (a.finalStates.includes(i)) {
            out += `${i}[shape="doublecircle", label="${showNums ? i : a.outState[i]}"]\n`;
        } else {
            out += `${i}[label="${showNums ? i : a.outState[i]}"]\n`;
        }
    }
    for (const [key, value] of a.transitions) {
        for(const num of value) {
            out += `${key[0]} -> ${num}[label=" ${key[1]} "]\n`;
        }
    }
    out += "}\n";
    return out;
}

export default Automata;
export { parseToGraphviz, stringToTrasition, epsilonChar };