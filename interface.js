//Módulo de interface
//Responsável por desenhar o jogo na tela e capturar as ações do usuário
//Comunica-se com o módulo de lógica para executar as ações

document.addEventListener('DOMContentLoaded', () => {
    const tabuleiro = document.getElementById('tabuleiro');
    const mensagemFimJogo = document.getElementById('mensagem-fim-jogo');
    let pecaSelecionada = null;

    //Renderiza o tabuleiro no HTML com base mp estadp do objeto JOGO
    function desenharTabuleiro() {
        tabuleiro.innerHTML = '';
        mensagemFimJogo.textContent = '';

        JOGO.tabuleiro.forEach((linha, i) => {
            linha.forEach((valor, j) => {
                const celulaDiv = document.createElement('div');
                celulaDiv.classList.add('celula');
                celulaDiv.dataset.linha = i;
                celulaDiv.dataset.coluna = j;

                if(valor === 1) 
                    celulaDiv.classList.add('peca');
                else if(valor === 0) 
                    celulaDiv.classList.add('vazio');
                else 
                    celulaDiv.classList.add('fora');
                
                tabuleiroContainer.appendChild(celulaDiv);
            });
        });
        adicionaListeners();
    }

    //Lista com o clique do usuário em qualquer célula do tabuleiro
    function handleCliqueCelula(event) {
        const celulaClicada = event.target.closest('.celula');
        if(!celulaClicada || celulaClicada.classList.contains('fora'))
            return;

        const linha = parseInt(celulaClicada.dataset.linha);
        const coluna = parseInt(celulaClicada.dataset.coluna);

        //Se uma peça já selecionada, tenta mover ou deselecionar
        if(JOGO.pecaSelecionada) {
            const moveu = JOGO.moverPeca(linha, coluna);

            //Limpa a aparência da seleção anterior, independentemente do resultado
            pecaSelecionada.classList.remove('selecionada');
            pecaSelecionada = null;

            if(moveu) {
                desenharTabuleiro(); //Redesenha o tabuleiro após o movimento
                verificarFim();
            }
        } else { //Nenhuma peça selecionada
            if(celulaClicada.classList.contains('peca') && JOGO.selecionarPaca(linha, coluna)){
                pecaSelecionada = celulaClicada;
                pecaSelecionada.classList.add('selecionada');
            }
        }
    }
})