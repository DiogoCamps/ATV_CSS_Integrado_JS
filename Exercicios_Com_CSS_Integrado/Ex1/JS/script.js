function carregarPaginasHTML(){
    inserirConteudo('navbarConteudo', 'navbar.html');
    inserirConteudo('bodyConteudo', 'body.html');
}

async function inserirConteudo(idElement, localPagina){
    try {
        let documentoInvertido = await carregarPagina(localPagina);
        
        let elemento = document.getElementById(idElement);
        
        while (elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
        }

        let conteudoBody = documentoInvertido.body;

        for (let no of conteudoBody.childNodes) {
            let noClone = no.cloneNode(true);
            elemento.appendChild(noClone);
        }

    } catch (error) {
        let errorMessage = document.createElement('p');
        errorMessage.textContent = `Erro ao carregar conteúdo: ${error.message}`;
        let elemento = document.getElementById(idElement);  
        elemento.appendChild(errorMessage);
    }
}

async function carregarPagina(localPagina){
    try {
        let resposta = await fetch(localPagina);
        let conteudo = await resposta.text();
        let domParser = new DOMParser();
        return domParser.parseFromString(conteudo, 'text/html');
    } catch (error) {
        throw new Error(`Erro ao carregar ${localPagina}: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', carregarPaginasHTML);
