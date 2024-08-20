import * as fs from "fs";
import * as readline from "readline";

/* Types */
enum TokenType {
    OPERAND = 1,
    OPERATOR,
    OPEN_PARENTHESES,
    CLOSE_PARENTHESES
}

type Token = {
    char: string,
    type: TokenType,
    precedence: number,
    argc: number
}

const escaped_char = "\\";

/* Globals */
const token_map: Map<string, Token> = new Map<string, Token>();
await populateMapByFile("./configs/tokens.cnf");

/* Functions */
async function populateMapByFile(filename: string) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filename),
        crlfDelay: Infinity,
    });

    for await (const line of rl) {
        if (!line.startsWith("##")) {
            const data: string[] = line.split(" ");
            if (data.length < 4) { throw Error("invalid data on tokens.cnf"); }
            const token: Token = { char: data[0], type: parseInt(data[1]), precedence: parseInt(data[2]), argc: parseInt(data[3]) };
            token_map.set(data[0], token);
        }
    }
}

function stringToTokenArray(input: string) {
    const chars: string[] = input.split("");
    const token_array: Token[] = [];
    let escaped : boolean = false;
    let temp_number: Token | undefined = undefined;

    for (const char of chars) {
        let token: Token;
        if(char === escaped_char) {
            escaped = true;
            continue;
        } else if (!escaped && token_map.has(char)) {
            token = structuredClone(token_map.get(char));
        } else {
            escaped = false;
            token = { char, precedence: 0, type: TokenType.OPERAND, argc: 0 };
        }
        if (token.type === TokenType.OPERATOR ||
            token.type === TokenType.OPEN_PARENTHESES ||
            token.type === TokenType.CLOSE_PARENTHESES) {

            if (temp_number !== undefined) {
                token_array.push(temp_number);
                temp_number = undefined;
            }
            token_array.push(token);
        } else {
            if (temp_number === undefined) {
                temp_number = token;
            } else {
                temp_number.char += token.char;
            }
        }
    }

    if (temp_number !== undefined) {
        token_array.push(temp_number);
    }

    return token_array;
}

function infixNotationToPosfix(infix: string): Token[] {
    const tokens: Token[] = stringToTokenArray(infix);
    // console.log(tokens);
    const out_queue: Token[] = [];
    const op_stack: Token[] = [];

    for (const token of tokens) {
        if (token.type === TokenType.OPERAND) {
            out_queue.push(token);
        }
        if (token.type === TokenType.OPERATOR) {
            while (op_stack.length !== 0 && op_stack[op_stack.length - 1].precedence > token.precedence) {
                if (op_stack[op_stack.length - 1].char === "(") {
                    throw new Error(`ERROR :: Molformed formula: ${infix}`);
                }
                out_queue.push(op_stack.pop());
            }
            op_stack.push(token);
        }
        if (token.type === TokenType.OPEN_PARENTHESES) {
            op_stack.push(token);
        }
        if (token.type === TokenType.CLOSE_PARENTHESES) {
            while (op_stack.length !== 0 && op_stack[op_stack.length - 1].type != TokenType.OPEN_PARENTHESES) {
                if (op_stack[op_stack.length - 1].char === "(") {
                    throw new Error(`ERROR :: Molformed formula: ${infix}`);
                }
                out_queue.push(op_stack.pop());
            }
            if (op_stack.length !== 0) {
                op_stack.pop();
            } else {
                throw new Error(`ERROR :: Molformed formula: ${infix}`);
            }
        }
    }

    while (op_stack.length !== 0) {
        if (op_stack[op_stack.length - 1].char === "(") {
            throw new Error(`ERROR :: Molformed formula: ${infix}`);
        }
        out_queue.push(op_stack.pop());
    }

    return out_queue;
}

export default infixNotationToPosfix;
export {TokenType};