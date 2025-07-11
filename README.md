# My Event Buddy

**My Event Buddy** é uma aplicação mobile multiplataforma desenvolvida em React Native com Expo. 
Seu objetivo é permitir que utilizadores explorem, guardem e inscrevam-se em eventos locais, com uma experiência fluida, moderna e persistente.

---

## 📱 Funcionalidades Principais

- Autenticação de utilizadores (registo, login, logout)
- Explorar lista de eventos (concertos, feiras, conferências, etc.)
- Visualizar detalhes de cada evento (com imagem, data, local e descrição)
- Favoritar e desfavoritar eventos
- Participar ou cancelar participação em eventos
- Página de perfil com eventos inscritos e histórico
- Persistência de sessão e dados com Firebase

---

## 🧰 Tecnologias Utilizadas

- React Native com Expo
- Firebase v8 (Authentication + Firestore)
- React Navigation (Bottom Tabs + Stack)
- JavaScript
- Firebase Firestore Rules
- useState, useEffect, Context API

---

## 🛠️ Instalação

Este projeto foi desenvolvido e testado diretamente no **Expo Web**.  
> Você pode abrir a pasta do projeto no próprio **Expo Snack** acessando:  
> [https://snack.expo.dev](https://snack.expo.dev)  
> e importando os ficheiros manualmente.

Alternativamente, pode executar localmente com:

1. Clone este repositório:

bash

git clone https://github.com/Renata-Baptistelli/MyEvent-Buddy.git

2. Instale as dependências e inicie:

npm install  
npm install firebase@8.10.0  
expo start

📁 Estrutura do Projeto

css

App.js  
navigation/  
├── StackNavigator.js  
├── TabNavigator.js  
paginas/  
├── Home.js  
├── Favoritos.js  
├── Perfil.js  
├── Login.js  
├── Registo.js  
├── Recupera.js  
├── DetalhesEvento.js  
components/  
├── [componentes reutilizáveis]  
assets/  
├── [imagens e ícones]


## 📸 Capturas de Tela

### 🟠 Tela de Login  
![Login](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/Login.jpg)

---

### 🔁 Recuperação de Senha  
![RecuperaSenha](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/RecuperaSenha.jpg)

---

### 🆕 Registo de Novo Utilizador  
![Registo](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/Registo.jpg)

---

### 🏠 Tela Home com eventos listados  
![Home](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/Home.jpg)

---

### 🗺️ Busca por local  
![HomeBuscaLocal](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/HomeBuscaLocal.jpg)

---

### 🔍 Busca por tipo de evento  
![HomeBuscaTipo](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/HomeBuscaTipo.jpg)

---

### 📍 Detalhes do Evento  
![DetalhesEvento](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/DetalhesEvento.jpg)

---

### 💛 Tela de Favoritos com opção de cancelar e desfavoritar  
![Favoritos](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/Favoritos.jpg)

---

### 👤 Tela de Perfil com eventos inscritos e histórico  
![Perfil](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/Perfil.jpg)


## 🎥 Demonstração em Vídeo


[▶️ Clique aqui para assistir ao vídeo de demonstração](https://github.com/Renata-Baptistelli/MyEvent-Buddy/blob/main/MyEventBuddy.mp4?raw=true)




🧑‍💻 Autoria

Este projeto foi desenvolvido por mim como parte da formação em Desenvolvimento Mobile Multiplataforma com React Native, sob orientação do formador Monge.

Representa um desafio completo de desenvolvimento mobile full-stack, utilizando backend serverless com Firebase, com foco em aplicações comerciais reais.

Ao longo da criação, foram aplicados conceitos fundamentais como hooks do React, navegação com React Navigation, integração com serviços externos, 
regras de segurança no Firestore, além de boas práticas de UI/UX.

O resultado final é um produto funcional, moderno e pronto para ser escalado ou adaptado para contextos profissionais.
























