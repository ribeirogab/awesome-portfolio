---
title: Performance como material de design
date: 2025-06-09
tag: Engenharia
excerpt: Tempo de carregamento é uma decisão de layout. O que mudou quando passamos a tratá-lo como espaço em branco, e não como tarefa chata.
---

## Uma decisão de layout

Quando uma página leva três segundos para pintar, a primeira coisa que a pessoa vê não é o layout. É a espera. Por melhores que sejam o tipo e o ritmo, quem lê já os encontra irritado.

Passamos a tratar o orçamento da primeira pintura do mesmo jeito que tratamos o espaço em branco: como um material com custo, planejado desde o primeiro esboço em vez de aparado no final.

## Três regras que ficaram

1. Entregue o texto primeiro. As fontes são recortadas e pré-carregadas, e o layout se sustenta sem elas.
2. Nenhum deslocamento de layout, nunca. Toda imagem e todo embed reservam seu espaço antes de carregar.
3. Um script para a página, não um por widget. Se uma funcionalidade precisa do próprio bundle, precisa da própria justificativa.

## O que a pessoa percebe

Nada. Esse é o ponto. A página simplesmente está ali, do jeito que um parágrafo bem composto é simplesmente legível. Performance bem feita é invisível, e é por isso que pertence tanto ao design quanto à engenharia.
