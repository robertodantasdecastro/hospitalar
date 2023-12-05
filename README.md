Sistema de Acompanhamento Hospitalar

Este repositório contém o código-fonte de um sistema em desenvolvimento para o acompanhamento hospitalar de pacientes em hospitais públicos. O objetivo principal é proporcionar uma plataforma que facilite a gestão do processo desde o credenciamento até o acompanhamento individual do paciente.

Funcionalidades Principais

1. Credenciamento e Elaboração do PIA
   A aplicação oferece um processo de credenciamento simples, permitindo que os usuários criem suas contas. Após o credenciamento, é possível elaborar o PIA (Prontuário Individual de Atendimento) para cada paciente.

2. Áreas Distintas para Cada Tipo de Usuário
   O sistema foi projetado para suportar diferentes tipos de usuários, cada um com suas áreas específicas de atuação. Isso inclui profissionais envolvidos no credenciamento, elaboração do PIA e acompanhamento individual do paciente.

3. Dados do IBGE para Facilitar o Cadastramento
   Para simplificar o processo de cadastramento e acolhimento, o sistema já integra dados do IBGE, fornecendo informações prévias sobre Estados, Cidades, logradouros e permitindo a consulta bidirecional ou a geração automática de CEP.

4. Acompanhamento e Evolução do Paciente
   O sistema utiliza o banco de dados do CID-19 para facilitar o diagnóstico de cada paciente. Isso permite um acompanhamento mais preciso e eficiente da evolução do paciente ao longo do tempo.

Tecnologias Utilizadas:

O sistema é desenvolvido usando NODE.JS. O FrontEnd, localizado na pasta Client, é construído com React e Redux, recebendo informações do BackEnd na pasta Server. O BackEnd, em fase de desenvolvimento, utiliza o framework Express e uma série de bibliotecas, incluindo:

- Bcrypt e bcryptjs para criptografia;
- Cookie-parser para manipulação de cookies
- Cors para lidar com requisições de diferentes origens
- Dotenv para gerenciamento de variáveis de ambiente
- Express-validator para validação de dados
- Jsonwebtoken para autenticação baseada em tokens JWT
- Nodemon para reinicialização automática do servidor durante o desenvolvimento
- Openai para integração com a API da OpenAI
- Passport e passport-jwt para autenticação
- Pg para interação com o PostgreSQL
- Websocket para comunicação em tempo real

A autenticação no sistema é realizada por meio de criptografia e validação usando tokens JWT.

Instruções de Execução:

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone este repositório.
3. Navegue até a pasta Client e siga as instruções no README.md para configurar e iniciar o FrontEnd.
4. Navegue até a pasta Server e siga as instruções no README.md para configurar e iniciar o BackEnd.

Este sistema está em constante desenvolvimento, e feedbacks são bem-vindos. Caso encontre problemas ou tenha sugestões de melhorias, sinta-se à vontade para abrir uma issue neste repositório.
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
# hospitalar
# hospitalar
# hospitalar
# hospitalar
# hospitalar
# hospitalar
# hospitalar
# hospitalar
>>>>>>> adfbebc (hospitalar)
>>>>>>> ab4dd5f (hospitalar)
