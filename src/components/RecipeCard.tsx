import { Card, Button, Text, Group, Divider, Modal } from "@mantine/core";
import like from "../assets/heart.png";
import { useState } from "react";
import { likeRecipe, unlikeRecipe } from "../services/likeService";
import { deleteRecipe, incrementRecipeView } from "../services/recipeService";

interface RecipeCardProps {
  id: string;
  onDetails: () => void;
  onDelete?: () => void;
  title: string;
  author: string;
  date: string;
  summary: string;
  votes?: number;
  imageBase64?: string;
  imageMimeType?: string;
  views: number;
}

export const RecipeCard = ({
  id,
  onDetails,
  title,
  author,
  date,
  summary,
  votes = 0,
  imageBase64,
  imageMimeType,
  onDelete,
  views,
}: RecipeCardProps) => {
  const [likes, setLikes] = useState<number>(votes);
  const [liked, setLiked] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleLike = async () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? Math.max(prev - 1, 0) : prev + 1));

    if (!liked) {
      await likeRecipe(id);
    } else {
      await unlikeRecipe(id);
    }
  };

  const handleDelete = async () => {
    setConfirmOpen(false);
    await deleteRecipe(id);
    if (onDelete) onDelete();
  };

  const handleDetails = async () => {
    await incrementRecipeView(id);
    onDetails();
  };
  const cardMinHeight = imageBase64 ? 320 : 180;
  const currentUser = localStorage.getItem("username");

  return (
    <>
      <Card
        shadow="md"
        p={imageBase64 ? 32 : 20}
        mb="xl"
        withBorder
        style={{
          maxWidth: 900,
          minHeight: cardMinHeight,
          width: "100%",
          margin: "0 auto",
          borderRadius: 24,
          background: "#fffefa",
          border: "1.5px solid #f5eee6",
          boxShadow: "0 4px 24px rgba(85, 107, 47, 0.08)",
          fontFamily: "'Inter', 'Pacifico', cursive, sans-serif",
          transition: "min-height 0.2s",
        }}
      >
        <Group justify="space-between" mb={8}>
          <Text
            fw={900}
            style={{
              fontFamily: "'Pacifico', cursive, sans-serif",
              fontSize: 28,
              color: "#3e2723",
              letterSpacing: 1,
            }}
          >
            {title}
          </Text>
          <Text size="xs" style={{ fontWeight: 600, color: "#7a6c5d" }}>
            por {author} • {new Date(date).toLocaleDateString()}
          </Text>
          <Text size="xs" style={{ color: "#7a6c5d" }}>
            {views} visualizações
          </Text>
          {currentUser &&
            author &&
            currentUser.trim().toLowerCase() ===
              author.trim().toLowerCase() && (
              <Button
                variant="outline"
                color="red"
                size="xs"
                style={{
                  borderRadius: 8,
                  fontWeight: 700,
                  marginLeft: 8,
                }}
                onClick={() => setConfirmOpen(true)}
              >
                Excluir
              </Button>
            )}
        </Group>
        <Divider my={12} color="#f5eee6" />
        <Text
          size="md"
          mb="md"
          style={{
            color: "#5d4037",
            fontWeight: 500,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {summary}
        </Text>
        {imageBase64 && (
          <Group justify="center" mb="md">
            <img
              src={`data:${imageMimeType};base64,${imageBase64}`}
              alt="imagem da receita"
              width="600px"
              height="450px"
            />
          </Group>
        )}
        <Group justify="space-between" mt={16}>
          <Button
            variant="light"
            color="olive"
            size="md"
            style={{
              fontWeight: 700,
              borderRadius: 8,
              background: "#cfe1b9",
              color: "#3e2723",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#e5f3d6")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#cfe1b9")}
            onClick={handleDetails}
          >
            Ver detalhes
          </Button>
          <Group gap={4}>
            <Button
              variant={liked ? "filled" : "subtle"}
              size="xs"
              style={{
                background: liked ? "#ffe0e0" : "#fff6e0",
                borderRadius: "50%",
                padding: 6,
                boxShadow: "0 1px 4px rgba(255, 179, 71, 0.08)",
              }}
              onClick={handleLike}
            >
              <img
                src={like}
                alt="heart like"
                style={{ width: 18, height: 18 }}
              />
            </Button>
            <Text size="sm" style={{ fontWeight: 700, color: "#d2691e" }}>
              {likes}
            </Text>
          </Group>
        </Group>
      </Card>
      <Modal
        opened={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Excluir receita"
        centered
      >
        <Text size="sm" mb="md">
          Tem certeza que deseja excluir esta receita? Esta ação não pode ser
          desfeita.
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setConfirmOpen(false)}>
            Cancelar
          </Button>
          <Button color="red" onClick={handleDelete}>
            Excluir
          </Button>
        </Group>
      </Modal>
    </>
  );
};
