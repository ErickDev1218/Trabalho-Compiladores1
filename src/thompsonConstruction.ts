import Automata, { epsilonChar, mergeAutomatas } from "./Automata.js";

function automataSum(A1 : Automata, A2 : Automata) {
    const res : Automata = {
        size: A1.size + A2.size + 2,
        initState: 0,
        finalStates: [A1.size + A2.size + 1],
        transitions: new Map<[number, string], number[]>()
    };
    mergeAutomatas(res, A1, 1);
    mergeAutomatas(res, A2, 1 + A1.size);
    res.transitions.set([0, epsilonChar], [A1.initState+1]);
    res.transitions.set([0, epsilonChar], [A2.initState + A1.size + 1]);
    for(let i = 0; i < A1.finalStates.length; i++) {
        res.transitions.set([A1.finalStates[i]+1, epsilonChar], res.finalStates);
    }
    for(let i = 0; i < A2.finalStates.length; i++) {
        res.transitions.set([A2.finalStates[i]+A1.size+1, epsilonChar], res.finalStates);
    }
    return res;
}

function automataConcat(A1 : Automata, A2 : Automata) :Automata {
    const res : Automata = {
        size: A1.size + A2.size - 1,
        initState: 0,
        finalStates: [A1.size + A2.size - 2],
        transitions: new Map<[number, string], number[]>()
    };
    mergeAutomatas(res, A1, 0);
    mergeAutomatas(res, A2, A1.size - 1);
    return res;
}

function automataKleene(A1 : Automata) : Automata {
    const res : Automata = {
        //Adiciona mais dois estados
        size: A1.size + 2,
        initState: 0,
        finalStates: [A1.size + 1],
        transitions: new Map<[number, string], number[]>()
    };
    //Move cada estado para o estado + 1, para liberar o novo estado inicial 
    mergeAutomatas(res,A1,1);
    //Transicao estado inicial para o primeiro estado com epsilon
    res.transitions.set([0,epsilonChar],[res.initState +1]);
    //Transicao estado inicial para o final com epsilon
    res.transitions.set([0,epsilonChar],res.finalStates);
    res.transitions.set([0 + A1.size ,epsilonChar],[res.initState + 1]);
    res.transitions.set([0 + A1.size ,epsilonChar],res.finalStates);
    return res;
}

export { automataSum, automataConcat , automataKleene };