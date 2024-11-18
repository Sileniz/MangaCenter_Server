# MangaCenter

## Descrição

MangaCenter é um aplicação web APIRest em Node.js desenvolvido com TypeScript que tem como função verifica disponibilidade dos leitores de mangás/manhwa/manhua/HQ brasileiros, e fornecer uma lista com o status atual do site, para facilitar a busca desses sites e saber quais estão na ativa.


## Funcionalidades

- Aplicação feita utilizando express
- Lista atualizada a cada 3 minutos para manter status o mais atual possível.
- Dados são armazenados em PostgreSQL utilizando pacote PG.
- CORS habilidado para manter somente um cliente oficial.
- Implementado em **TypeScript** para maior segurança e escalabilidade.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **PostgreSQL (PG)**: Banco de dados e pacote para gerenciar ele.
- **Express**: Framework utilizando para criar a aplicação web. 
- **dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`.

## Requisitos

- **Node.js** (versão 18+)
- **npm** ou **yarn** para gerenciamento de pacotes
- **PostgreSQL** para persistência de dados
## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/Sileniz/MangaCenter_Server.git
2. Navegue até a pasta:
    ```bash
    cd MangaCenter_Server
3. Instale as dependências::
    ```bash
    npm install
4. Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:
    ```bash
    SERVER_PORT=PORTA_DA_APLICACAO
    POSTGRES_STRING=STRING_DE_CONEXAO_COM_PG
<span></span>
## Uso

1. Para iniciar o serviço em modo de desenvolvimento, execute:
    ```bash
    npm run dev
<span></span>
Ele indentificara que não há dados no seu banco de dados e criara a tabela automaticamente e já ira inserir automaticamente grande maioria dos sites pré-disponibilizado por um json.
Há somente uma rota "/" que a lista de sites.
