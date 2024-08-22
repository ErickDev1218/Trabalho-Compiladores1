import { AutomataDFA, transitionToString } from "./Automata.js";

const biggerMarriage : Map<string, number> = new Map<string, number>([
    [ 'INT', 1 ],
    [ 'STR', 1 ],
    [ 'NUM', 0 ],
    [ 'VAR', 0 ],
    [ 'CST', 1 ],
    [ 'ADD', 1 ],
    [ 'SUB', 1 ],
    [ 'MUL', 1 ],
    [ 'EQU', 1 ],
    [ 'LTH', 1 ],
    [ 'GTH', 1 ],
    [ 'SCN', 1 ]
]);

function useDFA (A1 : AutomataDFA, word : string) : string{
    let actualState : number = 0;
    for(const char of word){
       if(A1.transitions.has(transitionToString({state : actualState, char}))){
        actualState = A1.transitions.get(transitionToString({state: actualState, char}));
       }else{
        return 'ERROR';
       }
    }
    if(A1.finalStates.includes(actualState)){
        const allPossibles = A1.outState.get(actualState);
        if(allPossibles.length > 1) {
            const maxPrecedence : number = Math.max(...allPossibles.map((val) => biggerMarriage.get(val)));
            for(const val of allPossibles) {
                if(biggerMarriage.get(val) === maxPrecedence) {
                    return val;
                }
            }
        } else {
            return allPossibles[0];
        }
    }else{
        return 'ERROR';
    }
}

export {useDFA};