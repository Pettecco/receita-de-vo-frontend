/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ActionIcon, Affix, Title, Transition } from "@mantine/core";
import { RecipeCard } from "../components/RecipeCard";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import girlImg from "../assets/girl.png";
import { RecipeDetails } from "../components/RecipeDetails";
import { fetchRecipes } from "../services/recipeService";
import { fetchUserById } from "../services/userService";
import type { RecipeDTO } from "../interfaces/recipe-dto";

type Recipe = {
  createdAt: Date;
  id: string;
  title: string;
  author: string;
  date: string;
  summary: string;
  votes: number;
  image?: string;
  description: string;
  ingredients: string[];
  steps: string;
  likes: number;
  comments: { author: string; text: string }[];
};

export const HomePage = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data: RecipeDTO[] = await fetchRecipes();
        const recipesWithAuthor = await Promise.all(
          data.map(async (recipe: RecipeDTO) => {
            let authorName = recipe.authorId;
            try {
              const user = await fetchUserById(recipe.authorId);
              authorName = user.username || recipe.authorId;
            } catch (e) {
              console.warn("Erro ao buscar autor:", recipe.authorId, e);
            }
            return {
              ...recipe,
              id: recipe._id,
              author: authorName,
              date: recipe.createdAt,
              summary: recipe.description,
              votes: recipe.likes,
              createdAt: new Date(recipe.createdAt),
            };
          })
        );
        setRecipes(recipesWithAuthor);
      } catch (err) {
        console.error("Erro ao carregar receitas:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRecipes();
  }, []);
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
        Receitas da Comunidade
        <span role="img" aria-label="panelinha">
          <img
            src={girlImg}
            alt="menina com comida"
            width="70px"
            height="68px"
          />
        </span>
      </Title>
      {loading ? (
        <p>Carregando receitas...</p>
      ) : (
        recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            {...recipe}
            onDetails={() => setSelectedRecipe(recipe)}
          />
        ))
      )}
      {selectedRecipe && (
        <RecipeDetails
          opened={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          recipe={selectedRecipe}
        />
      )}
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
