---
title: Verificação de regressão visual em toda entrega
date: 2025-11-03
tag: Engenharia
excerpt: Como um único diff de screenshot por pull request eliminou a conversa mais constrangedora do trabalho com clientes.
---

## A conversa constrangedora

Todo estúdio conhece a mensagem: "alguma coisa está diferente na home". Ninguém mexeu na home. Alguém mexeu em um componente compartilhado, e a home foi o único lugar que percebeu.

Por anos a resposta foi um humano cuidadoso clicando em cada página antes da entrega. Funcionou, até o site ter quarenta páginas e o humano ter um prazo.

## Um diff por pull request

Hoje renderizamos toda página do site de um cliente em três larguras a cada pull request e comparamos as imagens com o último conjunto aprovado. A ferramenta não é exótica. O que mudou foi a regra: um diff visual é uma verificação obrigatória, e um diff vermelho bloqueia o merge até alguém olhar.

A parte surpreendente foi como o diff raramente era um bug. Na maioria das vezes era uma mudança intencional que ninguém tinha contado para o resto do time. A verificação virou uma ferramenta de comunicação antes de virar uma rede de segurança.

## Quanto custa

Cerca de noventa segundos por pull request, e uma pasta pequena de imagens de referência que vive junto do código. Mais barato do que uma mensagem constrangedora.
