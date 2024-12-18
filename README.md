# db-desafio-rachel-gustavo

## CUIDAR MAIS

### Descrição
O projeto realizado para o Desafio da StartDB é uma aplicação web que visa conectar idosos precisando ou desejando realizar alguma tarefa com auxílio de voluntários que possam ajudá-los. Assim, para o solicitante, é possível criar uma tarefa, enquanto os voluntários podem aceitar aquelas que mais lhes interessarem.

---

### Conteúdos
- [Descrição](#descrição)
- [Instalação](#instalação)
  - [Requisitos do Sistema](#requisitos-do-sistema)
  - [Passos para Instalação/Uso](#passos-para-instalação)
  - [Fluxo de Utilização](#fluxo-de-utilização)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Testes](#testes)
- [Contato](#contato)

---

### Instalação

#### Requisitos do Sistema
- **Frontend**: React + TypeScript  
- **Backend**: SpringBoot + Spring Data JPA  
- **Banco de Dados**: PostgreSQL  
- **Infraestrutura**: Docker Desktop  

#### Passos para Instalação
1. Certifique-se de que o Docker está instalado no sistema.  
2. No diretório raiz do projeto, execute o seguinte comando para construir e inicializar os contêineres:
   ```bash
   docker-compose up --build
   ```
3. Após o processo, a aplicação estará disponível no navegador no endereço:
[http://localhost:3000](http://localhost:3000).

#### Fluxo de Utilização:
- **Idosos (Elderly)**:
  - Criam tarefas descrevendo a ajuda necessária.
  - Acompanham o status das tarefas criadas através da página "Minhas Tarefas".

- **Voluntários (Volunteer)**:
  - Visualizam a lista de tarefas disponíveis na página "Buscar Tarefas".
  - Aceitam as tarefas que desejarem.

### Estrutura do Projeto

#### Backend (Spring Boot)
O backend segue o padrão **MVC (Model-View-Controller)**, com as seguintes camadas principais:
- **Controller**: Gerencia os endpoints e processa requisições/respostas HTTP.
- **Service**: Implementa a lógica de negócios.
- **Repository**: Faz a comunicação com o banco de dados, utilizando o Spring Data JPA.
- **Entities**: Classes que representam os modelos no banco de dados.
- **DTO (Data Transfer Object)**: Facilita a transferência de dados entre camadas.
- **Infrastructure**: Classes relacionadas a camada de segurança.

#### Frontend (React + TypeScript)
O frontend está estruturado de forma modular, com:
- **Pages**: Páginas principais da aplicação.
- **Components**: Componentes reutilizáveis (botões, formulários, listas, etc.).
- **API**: Gerenciam chamadas à API do backend.
- **Services**: Acumulam as classes relacionadas ao DTO.
- **Utils**: Possuem funções e objetos utilizadas por Páginas ou Componentes.

---

### Testes

#### Backend:
Os testes no backend foram desenvolvidos com **JUnit** e **Mockito**:
- **Testes Isolados**: Validam a funcionalidade de controllers isoladamente.
- **Testes de Integração**: Verificam o funcionamento entre as diferentes camadas.

### Contato
- Gustavo Silva: [Linkedin](https://www.linkedin.com/in/gusilvo/)
- Rachel Pizane: [Linkedin](https://www.linkedin.com/in/rachel-pizane/)
