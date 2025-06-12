/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  ActionIcon,
  Affix,
  Avatar,
  Button,
  Group,
  Modal,
  Title,
  Transition,
} from "@mantine/core";
import { RecipeCard } from "../components/RecipeCard";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import girlImg from "../assets/girl.png";
import { RecipeDetails } from "../components/RecipeDetails";
import { fetchRecipes } from "../services/recipeService";
import {
  fetchUserById,
  getProfilePic,
  updateUserAvatar,
} from "../services/userService";
import type { RecipeDTO } from "../interfaces/recipe-dto";
import { AddRecipeForm } from "../components/AddRecipe";

type Comment = {
  user: string;
  text: string;
  createdAt?: string;
  _id?: string;
  author?: string;
};

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
  views: number;
  comments: Comment[];
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const HomePage = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const [show, setShow] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(
    localStorage.getItem("profileImage") || null
  );

  const username = localStorage.getItem("username") || "Usuário";

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const username = localStorage.getItem("username") || "Usuário";
        const img = await getProfilePic(username);
        setProfileImage(img);
      } catch {
        setProfileImage(null);
      }
    };
    fetchProfileImage();
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const refreshRecipes = async () => {
    setLoading(true);
    try {
      const data: RecipeDTO[] = await fetchRecipes();
      const recipesWithAuthor = await Promise.all(
        data.map(async (recipe: RecipeDTO) => {
          let authorName = recipe.authorId;
          try {
            const user = await fetchUserById(recipe.authorId);
            authorName = user.username || recipe.authorId;

            if (user && user._id) {
              localStorage.setItem("userId", user.id);
            }
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
            comments: (recipe.comments || []).map((comment: any) => ({
              user: comment.user || comment.author || "Desconhecido",
              text: comment.text,
              createdAt: comment.createdAt,
              _id: comment._id,
              author: comment.user || comment.author || "Desconhecido",
            })),
            likes: recipe.likes ?? 0,
            views: recipe.views ?? 0,
            ingredients: recipe.ingredients ?? [],
            steps: recipe.steps ?? "",
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

  useEffect(() => {
    refreshRecipes();
  }, []);

  useEffect(() => {
    setShow(scroll.y > 200);
  }, [scroll.y]);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <Button
          onClick={() => setShowAddRecipe(true)}
          style={{
            background: "#cfe1b9",
            color: "#3e2723",
            fontWeight: 700,
            borderRadius: 8,
            padding: "10px 24px",
            border: "none",
            cursor: "pointer",
            fontSize: 18,
          }}
        >
          + Adicionar Receita
        </Button>
        <Modal
          opened={showAddRecipe}
          onClose={() => setShowAddRecipe(false)}
          title="Adicionar nova receita"
          centered
          size="lg"
          style={{ background: "#f8f8f8" }}
        >
          <AddRecipeForm
            onSuccess={() => {
              setShowAddRecipe(false);
              refreshRecipes();
            }}
          />
        </Modal>
        <Group gap={8}>
          <span style={{ fontWeight: 600, color: "#3e2723", fontSize: 16 }}>
            {username}
          </span>
          <button
            type="button"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => document.getElementById("profile-upload")?.click()}
            aria-label="Alterar foto de perfil"
          >
            <Avatar
              color="olive"
              radius="xl"
              size={40}
              src={profileImage || undefined}
            >
              {!profileImage && getInitials(username)}
            </Avatar>
          </button>
          <input
            id="profile-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const base64 = await fileToBase64(file);
                setProfileImage(base64);
                localStorage.setItem("profileImage", base64);

                const userId = localStorage.getItem("userId");
                if (userId) {
                  await updateUserAvatar(userId, base64, file.type);
                }
              }
            }}
          />
        </Group>
      </div>
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
            onDelete={refreshRecipes}
          />
        ))
      )}
      {selectedRecipe && (
        <RecipeDetails
          opened={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          recipe={selectedRecipe}
          onRefresh={refreshRecipes}
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
