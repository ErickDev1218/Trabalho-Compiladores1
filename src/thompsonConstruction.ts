import AutomataNFA, { addTransition, charToAutomata, epsilonChar, mergeAutomatas } from "./Automata.js";
import infixNotationToPosfix, { Token, TokenType } from "./infixToPosfix.js";

function automataJoin(allAutomatas : AutomataNFA[]){
    let res : AutomataNFA = {} as AutomataNFA;
    if(allAutomatas.length > 0){
        res = allAutomatas[0];
    }
    for(let i = 1; i < allAutomatas.length; i++){
        res = _automataJoin(res,allAutomatas[i]);
    }
    return res;
}
function _automataJoin(A1: AutomataNFA, A2: AutomataNFA) {
    const res: AutomataNFA = {
        size: A1.size + A2.size + 1,
        initState: 0,
        finalStates: [...A1.finalStates.map(value => value+1), ...A2.finalStates.map(value => value + 1 + A1.size)],
        outState: new Map<number,string[]>,
        transitions: new Map<string, number[]>()
    };
    mergeAutomatas(res, A1, 1);
    mergeAutomatas(res, A2, 1 + A1.size);
    // res.outState[A1.size + A2.size + 1] = "(" + getOutStates(A1) + "|" + getOutStates(A2) + ")";
    // res.outState.set(A1.size + A2.size + 1,[`${A1.outState}|${A2.outState}`]);
    // res.transitions.set([0, epsilonChar], [A1.initState+1]);
    // res.transitions.set([0, epsilonChar], [A2.initState + A1.size + 1]);
    for(const [key, value] of A1.outState) {
        res.outState.set(key+1, value);
    }
    for(const [key, value] of A2.outState) {
        res.outState.set(key+1+A1.size, value);
    }
    addTransition(res.transitions, { state: 0, char: epsilonChar }, A1.initState + 1);
    addTransition(res.transitions, { state: 0, char: epsilonChar }, A2.initState + A1.size + 1);
    return res;
}

function automataSum(A1: AutomataNFA, A2: AutomataNFA) {
    const res: AutomataNFA = {
        size: A1.size + A2.size + 2,
        initState: 0,
        finalStates: [A1.size + A2.size + 1],
        outState: new Map<number,string[]>,
        transitions: new Map<string, number[]>()
    };
    mergeAutomatas(res, A1, 1);
    mergeAutomatas(res, A2, 1 + A1.size);
    // res.outState[A1.size + A2.size + 1] = "(" + getOutStates(A1) + "|" + getOutStates(A2) + ")";
    // res.outState.set(A1.size + A2.size + 1,[`${A1.outState}|${A2.outState}`]);
    // res.transitions.set([0, epsilonChar], [A1.initState+1]);
    addTransition(res.transitions, { state: 0, char: epsilonChar }, A1.initState + 1);
    // res.transitions.set([0, epsilonChar], [A2.initState + A1.size + 1]);
    addTransition(res.transitions, { state: 0, char: epsilonChar }, A2.initState + A1.size + 1);
    for (let i = 0; i < A1.finalStates.length; i++) {
        // res.transitions.set([A1.finalStates[i]+1, epsilonChar], res.finalStates);
        addTransition(res.transitions, { state: A1.finalStates[i] + 1, char: epsilonChar }, res.finalStates[0]);
    }
    for (let i = 0; i < A2.finalStates.length; i++) {
        // res.transitions.set([A2.finalStates[i]+A1.size+1, epsilonChar], res.finalStates);
        addTransition(res.transitions, { state: A2.finalStates[i] + A1.size + 1, char: epsilonChar }, res.finalStates[0]);
    }
    return res;
}

function automataConcat(A1 : AutomataNFA, A2 : AutomataNFA) : AutomataNFA {
    const res : AutomataNFA = {
        size: A1.size + A2.size - 1,
        initState: 0,
        finalStates: [A1.size + A2.size - 2],
        outState: new Map <number,string[]>,
        transitions: new Map<string, number[]>()
    };
    mergeAutomatas(res, A1, 0);
    mergeAutomatas(res, A2, A1.size - 1);
    // res.outState[A1.size + A2.size - 2] = "(" + getOutStates(A1) + "." + getOutStates(A2) + ")";
    return res;
}

function automataKleene(A1 : AutomataNFA) : AutomataNFA {
    const res : AutomataNFA = {
        //Adiciona mais dois estados
        size: A1.size + 2,
        initState: 0,
        finalStates: [A1.size + 1],
        outState: new Map<number,string[]>,
        transitions: new Map<string, number[]>()
    };
    //Move cada estado para o estado + 1, para liberar o novo estado inicial 
    mergeAutomatas(res,A1,1);
    //Transicao estado inicial para o primeiro estado com epsilon
    // res.transitions.set([0,epsilonChar],[res.initState +1]);
    addTransition(res.transitions,{state: 0, char: epsilonChar},res.initState+1);
    //Transicao estado inicial para o final com epsilon
    // res.transitions.set([0,epsilonChar],res.finalStates);
    addTransition(res.transitions,{state: 0, char: epsilonChar},res.finalStates[0]);
    // res.transitions.set([0 + A1.size ,epsilonChar],[res.initState + 1]);
    addTransition(res.transitions, {state:0 + A1.size, char: epsilonChar},res.initState+1);
    // res.transitions.set([0 + A1.size ,epsilonChar],res.finalStates);
    addTransition(res.transitions, {state: 0 + A1.size, char: epsilonChar}, res.finalStates[0]);
    return res;
}

function automataRange (s1 : string, s2 : string) : AutomataNFA {
    const startCharCode = s2.charCodeAt(0);
    const endCharCode = s1.charCodeAt(0);

    if (startCharCode > endCharCode) {
        throw new Error("s1 deve ser menor ou igual a s2");
    }

    const result: string[] = [];
    for (let i = startCharCode; i <= endCharCode; i++) {
        result.push(String.fromCharCode(i));
    }

    const ret = thompsonConstruction(result.join("|"));
    return ret;
}

function thompsonConstruction (regex : string, outString : string | undefined = undefined) : AutomataNFA {
    if(regex !== ''){
        const tokens : Token[] = infixNotationToPosfix(regex); 
        const stack : [AutomataNFA, string][] = [];
        for(const token of tokens){
            if(token.type === TokenType.OPERAND){
                stack.push([charToAutomata(token.char), token.char]);
            }else if(token.type === TokenType.OPERATOR){
                if(token.char === '|'){
                    const A1 : [AutomataNFA, string] = stack.pop();
                    const A2 : [AutomataNFA, string] = stack.pop();
                    stack.push([automataSum(A2[0],A1[0]), A1[1] + "|" + A2[1]]);
                } else if( token.char === "-") {
                    const A1 : [AutomataNFA, string] = stack.pop();
                    const A2 : [AutomataNFA, string] = stack.pop();
                    stack.push([automataRange(A1[1], A2[1]), A1[1] + "-" + A2[1]]);
                } 
                else if(token.char === '.'){
                    const A1 : [AutomataNFA, string] = stack.pop();
                    const A2 : [AutomataNFA, string] = stack.pop();
                    stack.push([automataConcat(A2[0],A1[0]), A1[1] + "." + A2[1]]);
                }
                else if(token.char === '*'){
                    const A1 : [AutomataNFA, string] = stack.pop();
                    stack.push([automataKleene(A1[0]), A1[1] + "*"]);
                }
            }
        }
        const ret : AutomataNFA = stack.pop()[0];
        ret.outState = new Map<number,string[]>;
        ret.outState.set(ret.size-1,[outString]);
        // ret.outState[ret.size-1] = outString === undefined ? regex : outString ;
        return ret;
    }else{
        throw Error('INVALID NULL REGEX!');
    }
}

export default thompsonConstruction;
export { _automataJoin,automataJoin };
// export { automataSum, automataConcat,automataKleene };