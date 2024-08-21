type Transition = {
    state: number,
    char: string
}

type AutomataNFA = {
    size: number, /*size = 2 -> state0, state1*/
    initState: number,
    finalStates: number[],
    outState: string[],
    transitions: Map<string, number[]>
}

type AutomataDFA = {
    size: number, /*size = 2 -> state0, state1*/
    initState: number,
    finalStates: number[],
    outState: string[],
    transitions: Map<string, number>
}

const epsilonChar: string = 'ε';

function stringToTrasition(str: string): Transition {
    const commaPos: number = str.indexOf(",");
    if (commaPos === -1) {
        throw new Error("stringToTransition :: No comma find");
    }
    const state = parseInt(str.substring(0, commaPos));
    if (isNaN(state)) {
        throw new Error("stringToTransition :: State is not a number");
    }
    return {
        state,
        char: str.substring(commaPos + 1, str.length)
    };
}

function transitionToString(T1: Transition): string {
    return `${T1.state},${T1.char}`;
}

function addTransition(map: Map<string, number[]>, trans: Transition, go: number) {
    const transString = transitionToString(trans);
    if (map.has(transString)) {
        map.get(transString).push(go);
    } else {
        map.set(transString, [go]);
    }
}

function _addTransition(map: Map<string, number>, trans: Transition, go: number) {
    const transString : string = transitionToString(trans);
    map.set(transString, go);
}

function charToAutomata(char: string): AutomataNFA {
    const transitions = new Map<string, number[]>;
    addTransition(transitions, {state: 0, char }, 1);

    return {
        size: 2,
        initState: 0,
        finalStates: [1],
        outState: [epsilonChar, char],
        transitions
    };
}

// * Copy transitions A1 <- A2 with offset = x on states
function mergeAutomatas(A1: AutomataNFA, A2: AutomataNFA, offset : number){
    for(const [key, values] of A2.transitions) {
        const trans : Transition = stringToTrasition(key);
        for(const value of values) {
            addTransition(
                A1.transitions, 
                { state: trans.state + offset, char: trans.char },
                value+offset
            );
        }
    }
    for(let i = offset; i < A1.size; i++) {
        if (!A1.outState[i]) {
            A1.outState[i] = A2.outState[i-offset];
        }
    }
}

const graphVizTemplate = `
digraph G {
graph [ dpi = 300 ]; 
node [ shape = "circle" ]
A [style=invis]
`;

function parseToGraphviz(a: AutomataNFA, showNums: boolean = true): string {
    let out = graphVizTemplate;
    for (let i = 0; i < a.size; i++) {
        if (i === a.initState) {
            out += `${i}[label="${showNums ? i : a.outState[i]}"]\n`;
            out += `A -> ${i}\n`;
        } else if (a.finalStates.includes(i)) {
            out += `${i}[shape="doublecircle", label="${showNums ? i : a.outState[i]}"]\n`;
        } else {
            out += `${i}[label="${showNums ? i : a.outState[i]}"]\n`;
        }
    }
    for (const [key, value] of a.transitions) {
        const trans : Transition = stringToTrasition(key);
        for (const num of value) {
            out += `${trans.state} -> ${num}[label=" ${trans.char} "]\n`;
        }
    }
    out += "}\n";
    return out;
}

function _parseToGraphviz(a: AutomataDFA, showNums: boolean = true): string {
    let out = graphVizTemplate;
    for (let i = 0; i < a.size; i++) {
        if (i === a.initState && a.finalStates.includes(i)) {
            out += `${i}[shape="doublecircle", label="${showNums ? i : a.outState[i]}"]\n`;
            out += `A -> ${i}\n`;
        } else if (i === a.initState) {
            out += `${i}[label="${showNums ? i : a.outState[i]}"]\n`;
            out += `A -> ${i}\n`;
        } else if (a.finalStates.includes(i)) {
            out += `${i}[shape="doublecircle", label="${showNums ? i : a.outState[i]}"]\n`;
        } else {
            out += `${i}[label="${showNums ? i : a.outState[i]}"]\n`;
        }
    }
    for (const [key, value] of a.transitions) {
        const trans : Transition = stringToTrasition(key);
        out += `${trans.state} -> ${value}[label=" ${trans.char} "]\n`;
    }
    out += "}\n";
    return out;
}

export default AutomataNFA;
export { AutomataDFA, Transition, stringToTrasition, parseToGraphviz, charToAutomata, transitionToString, mergeAutomatas, addTransition, epsilonChar, _addTransition, _parseToGraphviz};