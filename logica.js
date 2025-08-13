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

    //Inicia ou reinicia o jogo, copiando o estado inicial para o atual
    iniciar: function() {
        //Cria uma cópia para não alterar o estado inicial
        this.tabuleiro = JSON.parse(JSON.stringify(this.tabuleiroInicial));
        this.pecaSelecionada = null;
    },

    /**
     * Tenta selecionar uma peça nas coordenadas dadas.
     * @param {number} linha - A linha da peça.
     * @param {number} coluna - A coluna da peça.
     * @returns {boolean} - True se a seleção foi bem-sucedida, false caso contrário.
     */
    selecionarPeca: function(linha, coluna) {
        if(this.tabuleiro[linha][coluna] === 1) {
            this.pecaSelecionada = { linha, coluna };
            return true;
        }
        return false;
    }
}