type Automata = {
    size: number, /*size = 2 -> state0, state1*/
    initState: number,
    finalStates: number[],
    transitions: Map<[number, string], number[]>
}

function charToAutomata(char : string) : Automata {
    const transitions = new Map<[number, string], number[]>;
    transitions.set([0, char], [1]);

    return {
        size: 2,
        initState: 0,
        finalStates: [1],
        transitions 
    };
}

const graphVizTemplate = `
digraph G {
graph [ dpi = 300 ]; 
node [ shape = "circle" ]
A [style=invis]
`;

function parseToGraphviz(a : Automata) : void {
    let out = graphVizTemplate;
    for(let i = 0; i < a.size; i++) {
        if(i === a.initState) {
            out += `${i}\n`;
            out += `A -> ${i}\n`;
        } else if (a.finalStates.includes(i)) {
            out += `${i}[shape="doublecircle"]\n`;
        } else {
            out += `${i}\n`;
        }
    }
    for (const [key, value] of a.transitions) {
        for(const num of value) {
            out += `${key[0]} -> ${num}[label=" ${key[1]} "]\n`;
        }
    }
    out += "}\n";
    console.log(out);
}

export default Automata;
export { charToAutomata, parseToGraphviz };