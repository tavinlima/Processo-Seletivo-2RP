# Processo-Seletivo-2RP
## Repositório criado para realização do teste do processo seletivo da 2RP
- O desafio era a criação de um sistema que possibilite o cadastro e login de usuários,
com as seguintes funções:
- Cadastrar um novo usuário;
- Listar informações de um usuário;
- Alterar o nome e o tipo de um usuário;
- Excluir um usuário;
- Alterar o Status de um usuário (ativo ou inativo)
- Tipos de usuário.
Regras de Negócio
- A tabela usuários deve conter os campos nome, senha, tipo, email e
status;
- A tabela de tipos deve ter o tipo do usuário (geral, admin, root)
- Um usuário pode ter apenas um único tipo;
- Apenas usuários do tipo root e admin podem cadastrar novos usuários;
- Apenas usuários do tipo root e admin podem alterar qualquer informação do usuário (inclusive status);
- Apenas usuários root podem excluir usuários;
- Usuários do tipo geral só têm acesso a funcionalidade de listar informações de seu próprio usuário, bem como alterar suas próprias informações;
- O login deve ser feito com email e senha.

## Tecnologias utilizadas (e que você precisa ter no seu computador):
### Banco de Dados:
- <img align="center" alt="SQL" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sql/sql.png" /> - SQL
### Back-end (API): 
- <img align="center" alt="logo-Csharp" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"> - C# 
- <img align="center" alt="logo_visual_studio" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/visualstudio/visualstudio-plain.svg"> - Visual Studio

### Layouts (baixa e alta fidelidade): 
- <img align="center" alt="logo_figma" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/figma/figma-original.svg">- Figma

### Front-end: 
- <img align="center" alt="logo-React" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"> <img align="center" alt="logo-JavaScript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg"> - ReactJS
- <img align="center" alt="logo-HTML" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"> - HTML
- <img align="center" alt="logo-CSS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg"> - CSS
- <img align="center" alt="logo_VS_code" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/9f4f5cdb393299a81125eb5127929ea7bfe42889/icons/vscode/vscode-original.svg"> - Visual Studio Code

## Como executar:
- O primeiro passo é clonar esse repositório na sua máquina. Dê um git clone em uma pasta do seu computador e puxe todo o conteúdo do repositório;
![image](https://user-images.githubusercontent.com/82414372/183323475-ad158478-4b0e-4fd3-ad12-dc91a411f056.png)
![image](https://user-images.githubusercontent.com/82414372/139128823-ff065a72-ef85-4fa0-9a44-ce42be7597cd.png)
![image](https://user-images.githubusercontent.com/82414372/139128835-9f3437e5-ddf4-4327-b7f7-596120011dec.png)

- Abra o VS Code na solução que se encontra na pasta 'Back-End' -> 'UConnection_webAPI';
![image](https://user-images.githubusercontent.com/82414372/183323652-ef314dd8-9d53-4aa2-b01f-3d98fccc03e6.png)

- Entre na aba 'Ferramentas' -> Gerenciador de pacotes do NuGet -> Console do Gerenciador de Pacotes
![image](https://user-images.githubusercontent.com/82414372/183323078-edf24338-f249-43bf-ae87-3b72bfb1f2aa.png)

- Digite os comandos:
- add-migration
- db
- update-database
Para criar o banco dentro da sua máquina

- Para não sobrecarregar o processamento, feche a aplicação e a partir da barra de endereço da pasta onde se encontram os aquivos, abra o cmd e digite 'dotnet run';
![image](https://user-images.githubusercontent.com/82414372/139129151-62f419bb-dfff-4421-89fc-ebd0f64dded8.png)
![image](https://user-images.githubusercontent.com/82414372/139129188-59ec8f60-0f21-4736-9c53-f4362eedd15f.png)
![image](https://user-images.githubusercontent.com/82414372/139129203-c86aca5a-35c8-42c3-82c5-c632f47799f4.png)

- Para abrir o front-end da aplicação, abra o cmd na pasta 'UConnection_ui' e de um 'yarn add' para instalar todos os módulos utilizados na aplicação;
![image](https://user-images.githubusercontent.com/82414372/183323746-4d0a4cd7-0ecc-4bef-8362-f86a8faa641f.png)

- Em seguida, digite 'npm start' para rodar a aplicação;
![image](https://user-images.githubusercontent.com/82414372/183323791-1ac734eb-f4e6-4ac4-8a08-703068170c28.png)

- Agora assista o vídeo com a plataforma rodando:
