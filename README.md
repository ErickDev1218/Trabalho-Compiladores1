# Trabalho-Compiladores1
Trabalho de analisador léxico de um compilador
Feito por:
Antonio Erick
Mario Martins
Gustavo Gurgel
Joao Pedro Soares

# Etapa 1 - Difinição das RegEx de cada Token

| **Token** | **Regex**                    |
|-----------|------------------------------|
| INT       | `i.n.t`                      |
| STRING    | `s.t.r.i.n.g`                |
| ADD       | `+`                          |
| SUB       | `-`                          |
| MUL       | `*`                          |
| EQU       | `=`                          |
| LTH       | `<`                          |
| GTH       | `>`                          |
| SCN       | `;`                          |
| VAR       | `((([a-zA-Z])+.[0-9]*))`     |