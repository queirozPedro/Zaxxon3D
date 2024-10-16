# Zaxxon3D
Reprodução do jogo Zaxxon em 3D usando Threejs 

## Descrição
Zaxxon3D é um jogo em 3D desenvolvido com JavaScript e Three.js, que oferece uma experiência de voo com gráficos 3D diretamente no navegador. O jogador assume o controle de um foguete em um espaço aéreo com inimigos e obstáculos. A missão é destruir o máximo de inimigos possível e sobreviver, desviando de barreiras e evitando ser atingido.

### Inimigos
Os inimigos no jogo são representados por torres e outras aeronaves que tentam impedir o progresso do jogador. Eles possuem comportamentos distintos:
- **Torres de Defesa:** Fixas no chão. O objetivo do jogador é destruir os inimigos e desviar as torres antes que os tiros o alcancem.
- **Aeronaves Inimigas:** Movem-se pelo cenário e tentam colidir com o foguete ou disparar tiros para derrubá-lo. Esses inimigos são mais desafiadores, pois possuem movimentação dinâmica.

### Obstáculos
Além dos inimigos, há barreiras no caminho do jogador que precisam ser evitadas. Essas barreiras estão dispostas em diferentes posições e altitudes, tornando necessário o uso de manobras precisas para evitar colisões.

## Mecânicas de Jogo
- **Movimentação:** O jogador controla o foguete usando as teclas **W, A, S e D**, com liberdade para se mover horizontalmente e verticalmente.
- **Tiro:** Ao pressionar a tecla `Espaço`, o foguete dispara projéteis para destruir inimigos à frente. Os projéteis seguem em linha reta e desaparecem após um certo tempo.
- **Colisões:** Caso o foguete colida com uma barreira ou seja atingido por projéteis inimigos, ele sofre danos, e o jogo pode ser encerrado. O objetivo é desviar das colisões enquanto elimina os inimigos.
- **Pontuação:** Cada inimigo destruído aumenta a pontuação do jogador. O objetivo final é conseguir a maior pontuação possível antes de ser derrubado.

## Funcionalidades
- **Animação e Interação:** Movimentos fluidos dos objetos e respostas interativas aos comandos do jogador.
- **Múltiplos Objetos com Comportamentos Diferentes:** Inimigos, projéteis, barreiras e o foguete possuem comportamentos e animações.
- **Iluminação Dinâmica:** Utilização de efeitos de iluminação para simular luzes e sombras no ambiente 3D.
- **Modelagem 3D:** Uso de modelos detalhados para representar o foguete, os inimigos e os obstáculos no cenário.

## Tecnologias Utilizadas
- **JavaScript:** Linguagem de programação usada para a lógica do jogo e comportamento das entidades.
- **Three.js:** Biblioteca de JavaScript para renderização de gráficos 3D no navegador.
- **HTML/CSS:** Para a estrutura e estilo da página.
- **Visual Studio Code (VS Code):** Editor de código recomendado para desenvolvimento.