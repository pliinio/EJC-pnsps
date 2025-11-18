document.addEventListener('DOMContentLoaded', function() {
    const scene = document.querySelector('a-scene');
    const container = document.getElementById('container');
    const loading = document.getElementById('loading');
    const instructions = document.getElementById('instructions');
    const startButton = document.getElementById('start-button');
    
    // Esconder loading quando a cena carregar
    scene.addEventListener('loaded', function() {
        setTimeout(() => {
            loading.style.display = 'none';
            instructions.style.display = 'flex';
        }, 2000);
    });
    
    // Iniciar experiência quando clicar no botão
    startButton.addEventListener('click', function() {
        instructions.style.display = 'none';
        container.style.display = 'block';
        
        // Iniciar MindAR
        const mindarScene = scene.components["mindar-image"];
        mindarScene.start();
        
        // Adicionar eventos de clique
        setupInteractions();
    });
    
    function setupInteractions() {
        // Detectar cliques em elementos com classe 'clickable'
        document.querySelectorAll('.clickable').forEach(element => {
            element.addEventListener('click', function() {
                const redirectUrl = this.getAttribute('data-redirect');
                
                if (redirectUrl.includes('http')) {
                    // Abrir link externo (Spotify)
                    window.open(redirectUrl, '_blank');
                } else {
                    // Abrir página interna (orações)
                    window.location.href = redirectUrl;
                }
            });
        });
        
        // Feedback visual ao passar o mouse (em dispositivos com mouse)
        document.querySelectorAll('.clickable').forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.setAttribute('scale', '1.1 1.1 1.1');
            });
            
            element.addEventListener('mouseleave', function() {
                this.setAttribute('scale', '1 1 1');
            });
        });
    }
    
    // Detectar quando o marcador é encontrado/perdido
    scene.addEventListener('targetFound', event => {
        console.log("Marcador espiritual detectado!");
    });
    
    scene.addEventListener('targetLost', event => {
        console.log("Marcador espiritual perdido!");
    });
});