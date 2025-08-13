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
    },

    /**
     * Verifica se um movimento para uma célula de destino é válido.
     * @param {number} linhaDestino - A linha de destino.
     * @param {number} colunaDestino - A coluna de destino.
     * @returns {boolean} - True se o movimento for válido.
     */
    ehMovimentoValido: function(linhaDestino, colunaDestino) {
        if(!this.pecaSelecionada)
            return false;
        if(this.tabuleiro[linhaDestino][colunaDestino] !== 0)
            return false;

        const { linha: linhaOrigem, coluna: colunaOrigem } = this.pecaSelecionada;
        const diffLinha = Math.abs(linhaOrigem - linhaDestino);
        const diffColuna = Math.abs(colunaOrigem - colunaDestino);

        //Movimento horizontal de duas casas
        if(diffLinha === 0 && diffColuna === 2) {
            const colunaMeio = (colunaOrigem + colunaDestino) / 2;
            return this.tabuleiro[linhaOrigem][colunaMeio] === 1;
        }

        //Movimento vertical de duas casas
        if(diffLinha === 2 && diffColuna === 0) {
            const linhaMeio = (linhaOrigem + linhaDestino) / 2;
            return this.tabuleiro[linhaMeio][colunaOrigem] === 1;
        }
        return false;
    },

    /**
     * Executa o movimento da peça selecionada para o destino.
     * @param {number} linhaDestino - A linha de destino.
     * @param {number} colunaDestino - A coluna de destino.
     * @returns {boolean} - True se o movimento foi realizado.
     */
    moverPeca: function(linhaDestino, colunaDestino) {
        if(!this.ehMovimentoValido(linhaDestino, colunaDestino))
            return false;

        const { linha: linhaOrigem, coluna: colunaOrigem } = this.pecaSelecionada;

        //Atualiza o tabuleiro
        this.tabuleiro[linhaDestino][colunaDestino] = 1; //Destino ganha a peça
        this.tabuleiro[linhaOrigem][colunaOrigem] = 0; //Origem fica vazia
        this.tabuleiro[(linhaOrigem + linhaDestino) / 2][(colunaOrigem + colunaDestino) / 2] = 0; //Remove peça

        this.pecaSelecionada = null; //Limpa a seleção
        return true;
    }
}