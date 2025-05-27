// Lógica para o menu hamburger
const hamburgerMenu = document.getElementById('hamburgerMenu');
const navLinksContainer = document.getElementById('navLinks'); // O div que envolve a ul
const body = document.body;

if (hamburgerMenu && navLinksContainer) {
    hamburgerMenu.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active'); // Mostra/esconde o menu lateral
        hamburgerMenu.classList.toggle('active');     // Anima o botão hamburger para 'X'
        body.classList.toggle('sidebar-open');      // Para o efeito de blur no container
        
        // Atualiza o atributo aria-expanded para acessibilidade
        const isExpanded = navLinksContainer.classList.contains('active');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded.toString());
    });
}

// Lógica para definir o link ativo na navegação
// Executa quando o DOM estiver completamente carregado e parseado
document.addEventListener('DOMContentLoaded', () => {
    // Certifica-se que navLinksContainer foi definido (pode ser null se o script rodar antes do hamburger)
    // Mas como o hamburger também usa navLinksContainer, esta verificação é mais para o caso de
    // o script ser movido ou a lógica ser separada de forma diferente.
    const currentNavLinksContainer = document.getElementById('navLinks'); 
    if (!currentNavLinksContainer) return;

    const links = currentNavLinksContainer.querySelectorAll('ul li a');
    const currentPath = window.location.pathname;

    // Extrai o nome do arquivo da URL atual (ex: "instalacao.html")
    // Se for a raiz ("/"), considera "index.html"
    let currentPageFile = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    if (currentPageFile === '' || currentPath.endsWith('/')) {
        currentPageFile = 'index.html';
    }

    links.forEach(link => {
        link.classList.remove('active'); // Remove 'active' de todos os links primeiro
        
        // Pega o nome do arquivo do atributo href do link
        let linkFile = link.getAttribute('href');
        if (linkFile) {
            linkFile = linkFile.substring(linkFile.lastIndexOf('/') + 1);
             if (linkFile === '' && link.getAttribute('href').includes('index.html')) { // Caso especial para href="index.html"
                linkFile = 'index.html';
            }
        }

        if (linkFile === currentPageFile) {
            link.classList.add('active'); // Adiciona 'active' ao link da página atual
        }
    });
});