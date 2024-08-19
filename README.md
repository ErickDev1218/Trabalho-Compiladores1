# Trabalho 1 -Compiladores - Analisador Léxico
## Etapa 1 - Definição das RegEx de cada Token

|*| **Token** | **Regex**                          |
|--|-----------|-----------------------------------|
|1 | INT       | `i.n.t`                           |
|2 | STR       | `s.t.r.i.n.g`                     |
|3 | VAR       | `(a-z\|A-Z).((a-z\|A-Z)*.(0-9)*)*`|
|4 | NUM       | `(0-9).(0-9)*`                    |
|5 | CST       | `"((a-z\|A-Z)*.(0-9)*)*"`         |
|6 | ADD       | `+`                               |
|7 | SUB       | `-`                               |
|8 | MUL       | `*`                               |
|9 | EQU       | `=`                               |
|10| LTH       | `<`                               |
|11| GTH       | `>`                               |
|12| SCN       | `;`                               |


## Colaboradores 👨‍💻

* Antonio Erick
* Mario Martins
* Gustavo Gurgel
* Joao Pedro Soares
