# Rent Cars
Aluguel de carros

**Algumas das Tecnologias Utilizadas**
- NodeJS
- Express
- Typescript
- Typeorm
- Jest

**Banco de Dados**
- Postgres

**Instruções para Instalação**
- Clone o projeto em seu ambiente local
- Use de comando abaixo para inicializar um banco de dados postgres via docker:
> docker run --name rentcars -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=rentcars -p 5432:5432 -d postgres
- Use de comando abaixo para iniciar o servidor NodeJS:
> yarn dev
Uma mensagem deverá aparecer em seu terminal: "Server is running! PORT: 3333"
- Use de comando abaixo para inserir as tabelas no banco de dados:
> yarn typeorm migration:run
- Use de comando abaixo para inserir um usuário Admin:
> yarn seed
