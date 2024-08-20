import Automata, { epsilonChar } from "./Automata.js";

function closure(A1 : Automata, state : number) : number[] {
    const ret : number[] = [];
    const stack = [state];

    while(stack.length > 0) {
        const curr = stack.pop();
        for(const [key, value] of A1.transitions){
            if(key[0] === curr && key[1] === epsilonChar) {
                stack.push(...value);
            }
        }
        ret.push(curr);
    }

    return ret;
}

export { closure };