//MÓDULO DE INTERFACE
//Responsável por desenhar o jogo na tela e capturar as ações do usuário.
//Comunica-se com o módulo de lógica para executar as ações.
document.addEventListener('DOMContentLoaded', () => {
    const tabuleiro = document.getElementById('tabuleiro');
    const mensagemFimJogo = document.getElementById('mensagem-fim-jogo');
    let pecaSelecionada = null;

    //Renderiza o tabuleiro no HTML com base no estado do objeto JOGO.
    function desenharTabuleiro() {
        tabuleiro.innerHTML = '';
        //Não limpa a mensagem de fim de jogo aqui para que ela persista
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
                tabuleiro.appendChild(celulaDiv);
            });
        });
    }

    //Lida com o clique do usuário em qualquer célula do tabuleiro.
    function handleCliqueCelula(event) {
        const celulaClicada = event.target.closest('.celula');
        if(!celulaClicada || celulaClicada.classList.contains('fora'))
            return;

        const linha = parseInt(celulaClicada.dataset.linha);
        const coluna = parseInt(celulaClicada.dataset.coluna);
        const clicouEmPeca = celulaClicada.classList.contains('peca');

        //Caso 1: Já existe uma peça selecionada
        if(JOGO.pecaSelecionada) {
            const moveu = JOGO.moverPeca(linha, coluna);

            if(moveu) {
                //Movimento bem-sucedido: redesenha tudo
                pecaSelecionada = null;
                desenharTabuleiro();
                verificarFim();
            } else {
                //Movimento inválido: deseleciona a peça antiga
                pecaSelecionada.classList.remove('selecionada');
                JOGO.pecaSelecionada = null;
                pecaSelecionada = null;

                //Se o clique inválido foi em outra peça, seleciona essa nova peça
                if(clicouEmPeca) {
                    JOGO.selecionarPeca(linha, coluna);
                    pecaSelecionada = celulaClicada;
                    pecaSelecionada.classList.add('selecionada');
                }
            }
        } else { //Caso 2: Nenhuma peça selecionada
            //Se o clique foi em uma peça, seleciona-a
            if(clicouEmPeca) {
                JOGO.selecionarPeca(linha, coluna);
                pecaSelecionada = celulaClicada;
                pecaSelecionada.classList.add('selecionada');
            }
        }
    }

    //Verifica se o jogo terminou e exibe a mensagem apropriada.
    function verificarFim() {
        if(JOGO.verificarFimJogo()) {
            const pecasRestantes = JOGO.tabuleiro.flat().filter(p => p === 1).length;
            if(pecasRestantes === 1) {
                mensagemFimJogo.textContent = 'Parabéns, você é um gênio!';
                mensagemFimJogo.style.color = 'var(--cor-texto-vitoria)';
            } else {
                mensagemFimJogo.textContent = `Fim de jogo! Restaram ${pecasRestantes} peças.`;
                mensagemFimJogo.style.color = 'var(--cor-texto-derrota)';
            }
        }
    }

    //Ponto de Entrada
    JOGO.iniciar();
    desenharTabuleiro();
    //Adiciona o listener de evento ao contêiner do tabuleiro uma única vez
    tabuleiro.addEventListener('click', handleCliqueCelula);
});