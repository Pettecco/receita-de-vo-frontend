import { Card, Button, Text, Group, Divider } from "@mantine/core";
import like from "../assets/heart.png";
import { useState } from "react";

interface RecipeCardProps {
  title: string;
  author: string;
  date: string;
  summary: string;
  votes?: number;
  image?: string;
}

export const RecipeCard = ({
  title,
  author,
  date,
  summary,
  votes = 0,
  image,
}: RecipeCardProps) => {
  const [likes, setLikes] = useState(votes);

  // Define minHeight condicionalmente
  const cardMinHeight = image ? 320 : 180;

  return (
    <Card
      shadow="md"
      p={image ? 32 : 20}
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
        <Text size="xs" color="#7a6c5d" style={{ fontWeight: 600 }}>
          por {author} • {new Date(date).toLocaleDateString()}
        </Text>
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
      {image && (
        <Group justify="center" mb="md">
          <img
            src={image}
            alt="imagem da receita"
            style={{
              maxHeight: 300,
              maxWidth: "100%",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(85, 107, 47, 0.08)",
              background: "#fdf6ec",
              padding: 8,
            }}
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
        >
          Ver detalhes
        </Button>
        <Group gap={4}>
          <Button
            variant="subtle"
            size="xs"
            style={{
              background: "#fff6e0",
              borderRadius: "50%",
              padding: 6,
              boxShadow: "0 1px 4px rgba(255, 179, 71, 0.08)",
            }}
            onClick={() => setLikes((prev) => prev + 1)}
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
  );
};
