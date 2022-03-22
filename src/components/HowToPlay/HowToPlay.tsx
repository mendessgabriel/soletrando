import React from "react";

const HowToPlay = (closeModal: () => void) => {
    return (
        <div className='modal-overlay'>
            <h1>Como jogar</h1>
            <main className='tutorial'>
                <p>Só letrando é um jogo de adivinhação de palavras. Todos os dias uma palavra secretra
                    de até 5 letras será escolhida para você tentar adivinhar em até 6 tentativas. Lembrando que as palavras devem existir para serem consideradas.</p>
                <p>A cada rodada, as letras da rodada acima mudarão de cor para você entender se está perto está de acertar a palavra secreta.</p>
                <p>Caso a letra fique verde, você acertou a letra na mesma posição que essa letra está na palavra secreta.</p>
                <div className='img-green'></div>
                <p>Caso a letra fique amarela, você acertou a letra que está presente na palavra secreta, porém fora da posição.</p>
                <div className='img-yellow'></div>
                <p>Caso a letra fique vermelha, indica que essa letra não está presente na palavra secreta.</p>
                <div className='img-red'></div>
                <p>Você terá direito a mais uma rodada se encontrar 9 letras que existam na palavra secreta, seja ela verde ou amarela. Um ícone de '+ 1' aparecerá e clicando nele, uma nova rodada será criada.</p>
                <div className='img-chance'></div>
                <p>Aqui você também pode escolher o tema da palavra secreta, basta selecionar um dos temas disponíveis no botão no canto superior direito da sua tela.</p>
                <div className='img-theme'></div>
                <br />
                <p>Desenvolvido por <a href='https://www.instagram.com/gmrmendes/' target='_blank'>@gmrmendes</a></p>
                <p>Versão brasileira não-oficial do <a href='https://www.nytimes.com/games/wordle/index.html' target='_blank'>Wordle</a></p>
                <p>powered by React & GitHub Pages</p>
            </main>
            <footer className='footer-modal'>
                <button className='btn-close' onClick={closeModal}>Fechar</button>
            </footer>
        </div>
    );
}

export default HowToPlay;