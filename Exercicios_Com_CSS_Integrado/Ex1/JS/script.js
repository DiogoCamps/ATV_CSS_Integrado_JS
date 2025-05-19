function carregarPaginasHTML(){
    inserirConteudo('navbarConteudo', 'navbar.html');
    inserirConteudo('bodyConteudo', 'body.html');


async function inserirConteudo(idElement, localPagina){
    try{
        let documentoInvertido = await carregarPagina(localPagina);
        while(elemento.firstChild) {
            elemento.removeChild(elemento.firstChild);
    }
        let conteudoBody = documentoInvertido.body;

    for (let no of conteudoBody.childNodes){
        let noClone = no.cloneNode (true);
        elemento.appendChild(noClone)
    }

    } catch (error) {
    let errorMessage =document.createElement('p');
    errorMessage.textContent = error.errorMessage;
    elemento.appendChild(errorMessage);
    }
    }
}
async function carregarPagina(localPagina){
    try{
        let resposta = await fetch(localPagina);
        let conteudo = await resposta.text();
        let domParser = new DOMParser();
        return domParser.parseFromString(conteudo, 'text/html');
    }catch (error){
        throw new Error(`Erro ao carregar ${localPagina}: ${error.message}`);
    }
}




document.addEventListener('DOMContentLoaded', carregarPaginasHTML)