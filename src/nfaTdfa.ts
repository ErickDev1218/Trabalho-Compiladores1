import AutomataNFA, { _addTransition, AutomataDFA, epsilonChar, stringToTrasition, Transition, transitionToString } from "./Automata.js";

function _getClosure(A1: AutomataNFA, state: number): number[] {
    const stack: number[] = [];
    const closure: number[] = [];
    stack.push(state);

    while (stack.length !== 0) {
        const curr = stack.pop();
        let trans = A1.transitions.get(transitionToString({ state: curr, char: epsilonChar }));
        trans = trans === undefined ? [] : trans;
        for (const state of trans) {
            if (!closure.includes(curr)) {
                stack.push(state);
            }
        }
        if (!closure.includes(curr)) {
            closure.push(curr);
        }
    }

    return closure;
}

function getClosure(A1: AutomataNFA, states: number[]): number[] {
    const closure: number[] = [...states];

    for (const state of states) {
        const currClosure: number[] = (_getClosure(A1, state)).filter(value => !closure.includes(value));
        closure.push(...currClosure);
    }

    return closure;
}

function getAlphabet(A1: AutomataNFA) {
    const alpha: string[] = [];
    for (const [key] of A1.transitions) {
        const trans: Transition = stringToTrasition(key);
        if (trans.char != epsilonChar && !alpha.includes(trans.char)) {
            alpha.push(trans.char);
        }
    }
    return alpha;
}

function dfaEdge(A1: AutomataNFA, states: number[], char: string): number[] {
    const ret: number[] = [];
    for (const state of states) {
        let to_push = A1.transitions.get(
            transitionToString({ state, char }),
        );
        to_push = to_push === undefined ? [] : to_push;
        to_push = to_push.filter(value => !ret.includes(value));
        ret.push(...to_push);
    }
    return getClosure(A1, ret).sort();
}

function nfaTodfa(A1: AutomataNFA): AutomataDFA {
    const res: AutomataDFA = {
        size: 0,
        finalStates: [],
        initState: 0,
        outState: new Map<number, string[]>,
        transitions: new Map<string, number>()
    };
    const bigToSmall = new Map<string, number>();
    const alpha: string[] = getAlphabet(A1);
    const stack: number[][] = [];
    const firstClosure = getClosure(A1, [A1.initState]).sort();
    stack.push(firstClosure);
    if (!bigToSmall.has(firstClosure.join(","))) {
        bigToSmall.set(firstClosure.join(","), bigToSmall.size);
    }
    for (const st of firstClosure) {
        if (A1.finalStates.includes(st)) {
            const realState = bigToSmall.get(firstClosure.join(","));
            if (!res.finalStates.includes(realState)) {
                res.finalStates.push(realState);
            }
        }
    }
    const isResolve : Map<number, boolean> = new Map<number, boolean>();
    while (stack.length != 0) {
        const curr: number[] = stack.pop();
        if (!bigToSmall.has(curr.join(","))) {
            bigToSmall.set(curr.join(","), bigToSmall.size);
        }
        for (const char of alpha) {
            const bigState: number[] = dfaEdge(A1, curr, char);
            if (bigState.length !== 0) {
                if(!isResolve.has(bigToSmall.get(bigState.join(",")))) {
                    stack.push(bigState);
                }
                if (!bigToSmall.has(bigState.join(","))) {
                    bigToSmall.set(bigState.join(","), bigToSmall.size);
                }
                _addTransition(
                    res.transitions,
                    { state: bigToSmall.get(curr.join(",")), char },
                    bigToSmall.get(bigState.join(","))
                );
                // for (const st of bigState) {
                //     if (A1.finalStates.includes(st)) {
                //         const realState = bigToSmall.get(bigState.join(","));
                //         if (!res.finalStates.includes(realState)) {
                //             res.finalStates.push(realState);
                //         }
                //     }
                // }
            }
        }
        isResolve.set(bigToSmall.get(curr.join(",")), true);
        const newFinal : string[] = [];
        for(const state of curr) {
            for(const [key, value] of A1.outState) {
                if(state === key) {
                    const _value = value.filter(val => !newFinal.includes(val));
                    newFinal.push(..._value);
                }
            }
        }
        if(newFinal.length > 0) {
            const small = bigToSmall.get(curr.join(','));
            res.outState.set(small, newFinal);
            if(!res.finalStates.includes(small)) {
                res.finalStates.push(small);
            }
        }
    }
    res.finalStates.sort();
    res.size = bigToSmall.size;
    return res;
}

export { getClosure, getAlphabet, dfaEdge, nfaTodfa };