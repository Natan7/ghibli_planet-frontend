# 🌎 Planet Ghibli

Uma interface frontend para explorar os filmes do Studio Ghibli. O projeto permite buscar, filtrar e ordenar filmes, além de fornecer funcionalidades como avaliação pessoal, marcação de filmes (Assistido/Favoritos) e a possibilidade de adicionar anotações.

## Instruções de Instalação e Execução

Siga os passos abaixo para rodar a aplicação localmente:

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/Natan7/ghibli_planet-frontend.git
    ``` 
2. **Entre na Pasta do Projeto:**
    ```bash
    cd ghibli_planet-frontend
    ```
3. **Instale as Dependências:**
    ```bash
    npm install
    ```
4. Inicie a Aplicação: 
    ```bash
    npm start
    ```
5. **Acesse a Aplicação:**

A aplicação será aberta automaticamente no seu navegador padrão ou você pode acessá-la através do endereço: http://localhost:3000/

## Ferramentas Utilizadas

- **React:** Biblioteca para construir interfaces de usuário de forma declarativa.
- **React Bootstrap:** Conjunto de componentes responsivos e estilizados para React.
- **Material UI:** Biblioteca de componentes visuais para React, utilizada, por exemplo, no componente de Rating.
- **React Icons:** Conjunto de ícones que enriquecem a interface, permitindo a substituição de ícones por imagens quando necessário.
- **LocalStorage API:** Para persistir dados como avaliações, status (Assistido/Favoritos) e anotações.

## Requisitos Implementados

- **Listagem de Filmes Responsiva:**  
  Exibição dos filmes do Studio Ghibli em um grid que se adapta conforme a largura da tela – de 1 até 4 filmes por linha.

- **Exibição de Detalhes do Filme:**  
  Mostra informações como título, data de lançamento, duração, diretor, produtor, sinopse, nota RT Score e notificações visuais.

- **Avaliação Pessoal e Feedback:**  
  Possibilidade de avaliação pessoal dos filmes com armazenamento via LocalStorage e feedback visual através de toasts.

- **Filtros e Ordenação:**  
  - Pesquisa por título, sinopse ou ano.  
  - Filtros para exibir somente filmes marcados como **Assistido**, **Favoritos**, **Com Anotação** e **Com Avaliação Pessoal**.  
  - Opções de ordenação (A-Z, Z-A, duração, avaliação pessoal e Nota Geral).  
  - Botão de "Limpar Filtros" que aparece quando algum filtro está ativo.

- **Interatividade e Experiência do Usuário:**  
  - Notificações (toasts) para informar sobre atualizações no status dos filmes.  
  - Modal para adicionar ou editar anotações de forma dinâmica.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para mais detalhes.

---

## 📧 Contato

Para dúvidas ou sugestões, entre em contato com [seu email/linkedin](https://www.linkedin.com/in/natan-macena-ribeiro/).
