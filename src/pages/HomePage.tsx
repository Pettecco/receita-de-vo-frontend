import { ActionIcon, Affix, Title, Transition } from "@mantine/core";
import { RecipeCard } from "../components/RecipeCard";
import grandmotherImg from "../assets/grandmother.png";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { useEffect, useState } from "react";

const mockRecipes = [
  {
    id: 1,
    title: "Bolo de Fubá da Vó Maria",
    author: "vovo_maria",
    date: "2025-06-08",
    summary: "Um bolo fofinho e fácil, perfeito para o café da tarde.",
    votes: 12,
  },
  {
    id: 2,
    title: "Feijoada Completa",
    author: "vovo_conceicao",
    date: "2025-06-07",
    summary: "A tradicional feijoada brasileira, do jeito que a família gosta.",
    votes: 8,
    image: grandmotherImg,
  },
  {
    id: 2,
    title: "Feijoada Completa",
    author: "vovo_conceicao",
    date: "2025-06-07",
    summary: "A tradicional feijoada brasileira, do jeito que a família gosta.",
    votes: 8,
    image: grandmotherImg,
  },
  {
    id: 2,
    title: "Feijoada Completa",
    author: "vovo_conceicao",
    date: "2025-06-07",
    summary: "A tradicional feijoada brasileira, do jeito que a família gosta.",
    votes: 8,
    image: grandmotherImg,
  },
];

export const HomePage = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(scroll.y > 200);
  }, [scroll.y]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <Title
        order={2}
        mb="lg"
        style={{
          textAlign: "center",
          fontFamily: "'Lobster', 'Pacifico', cursive, sans-serif",
          fontSize: 44,
          color: "#3e2723",
          textShadow: "2px 2px 8px rgba(255, 176, 133, 0.13)",
          letterSpacing: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          paddingBottom: "40px",
        }}
      >
        <span role="img" aria-label="panelinha">
          🍪
        </span>
        Receitas da Comunidade
        <span role="img" aria-label="panelinha">
          🍪
        </span>
      </Title>
      {mockRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
      <Affix position={{ bottom: 32, right: 32 }}>
        <Transition transition="slide-up" mounted={show}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              variant="filled"
              color="olive"
              size="xl"
              radius="xl"
              onClick={() => scrollTo({ y: 0 })}
              aria-label="Voltar ao topo"
            >
              <IconArrowUp size={28} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </div>
  );
};
