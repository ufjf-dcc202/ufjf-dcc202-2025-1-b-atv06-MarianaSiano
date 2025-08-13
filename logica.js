//Responsável pelo estado do tabuleiro e regras do jogo
//Não tem conhecimento sobre a interface
const jogo = {
    //Representação do tabuleiro padrão
    //Fora do Tabuleiro: -1; Vazio: 0 e Peça: 1
    tabuleiroInicial: [
        [-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1],
        [ 1,  1, 1, 1, 1,  1,  1],
        [ 1,  1, 1, 0, 1,  1,  1],
        [ 1,  1, 1, 1, 1,  1,  1],
        [-1, -1, 1, 1, 1, -1, -1],
        [-1, -1, 1, 1, 1, -1, -1]
    ],
    tabuleiro: [],
    pecaSelecionada: null,
}