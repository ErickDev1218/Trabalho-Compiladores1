const myER = 'a|b'
/*
Caractere especial que representa epislon: @
{
    'S' : [ ['a','q1'],['b','q2],['c','q3'] ]
}
*/

/*
 * Tokens:           Expressões Regulares:
 * INT               i.n.t
 * STRING            s.t.r.i.n.g
 * ADD               +
 * SUB               -
 * MUL               *
 * EQU               =
 * BTH               <
 * LTH               >
 * SCN               ;
 * VAR               ( ( ((a-z) | (A-Z))+  . (0-9)* ) *)
 */
const eu22eu = 10
interface automato{
    inicial : string
    final : string
    estados : string[]
    transicoes : Map<string,string[]>
}
//INT - Token
// I . N . T - ER
const inteiro : automato = {
    inicial : 'q1',
    final : 'q3',
    estados: ['q1','q2','q3'],
    transicoes: new Map<string,string[]>() 
}
const map = new Map()
const operandores = ['|', '*', '+', '(', ')','.']
const alfabeto: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '@'
  ];



for(let i = 0; i < myER.length; i++){
    const atual = myER.slice(i,i+1);
    if(!map.get(atual) && !operandores.includes(atual)){
        map.set(atual,[`${atual}`,'proximo estado'])
    }
}

map.forEach((key,value) => console.log(key,value))

const preparar_lista = (ER : string) => {
    const lista_ER = []
    for(let i = 0; i < myER.length; i++){
        const atual = myER.slice(i,i+1);
        if(alfabeto.includes(atual)){

        }
    }
}
const converte_ER_to_AFN = (ER : string) => {
    const pilha = []
    const AFN = []
    const lista_ER = preparar_lista(ER)
}