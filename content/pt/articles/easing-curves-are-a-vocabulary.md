---
title: Curvas de easing são um vocabulário
date: 2026-01-28
tag: Movimento
excerpt: A linguagem de movimento de um estúdio é um punhado de curvas usadas com consistência. Estas são as nossas, e é assim que as nomeamos.
---

## Quatro curvas, quatro nomes

A maioria dos sistemas de movimento falha porque tem opções demais. O nosso tem quatro curvas, e cada uma tem um nome que o estúdio inteiro usa na conversa, no Figma e no código.

- **Settle** é um ease-out suave para o que chega: menus, tooltips, linhas expandidas.
- **Leave** é um ease-in rápido para o que vai embora. Nada deve se demorar na saída.
- **Swap** é um ease simétrico para mudanças de estado no lugar, como a troca de tema.
- **Drift** é uma curva longa, quase linear, para movimento ambiente que não deve chamar o olhar.

## As curvas no código

Cada nome é uma custom property, então um componente nunca carrega um cubic-bezier próprio.

```css
:root {
  --ease-settle: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-leave: cubic-bezier(0.4, 0, 1, 1);
  --ease-swap: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-drift: cubic-bezier(0.3, 0, 0.7, 1);
}
```

## Por que nomes importam

Uma designer pode dizer "isso deveria settle, não swap" e o engenheiro sabe exatamente qual propriedade usar. A conversa de revisão sai dos números e vai para a intenção, e intenção é sobre o que de fato discordamos.
