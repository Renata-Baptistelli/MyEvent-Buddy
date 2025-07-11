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
![Login](link-da-imagem)

---

### 🔁 Recuperação de Senha  
![RecuperaSenha](link-da-imagem)

---

### 🆕 Registo de Novo Utilizador  
![Registo](link-da-imagem)

---

### 🏠 Tela Home com eventos listados  
![Home](link-da-imagem)

---

### 🗺️ Busca por local  
![HomeBuscaLocal](link-da-imagem)

---

### 🔍 Busca por tipo de evento  
![HomeBuscaTipo](link-da-imagem)

---

### 📍 Detalhes do Evento  
![DetalhesEvento](link-da-imagem)

---

### 💛 Tela de Favoritos com opção de cancelar e desfavoritar  
![Favoritos](link-da-imagem)

---

### 👤 Tela de Perfil com eventos inscritos e histórico  
![Perfil](link-da-imagem)


## 🎥 Demonstração em Vídeo

📽️ Clique aqui para ver o vídeo


🧑‍💻 Autora

Este projeto foi desenvolvido por mim, como parte da formação em desenvolvimento mobile multiplataforma com React Native, com toda a orientação do formador Monge.
























