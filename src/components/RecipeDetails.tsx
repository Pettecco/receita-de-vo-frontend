import {
  Modal,
  Text,
  Group,
  Divider,
  Button,
  Image,
  Title,
  List,
  ScrollArea,
} from "@mantine/core";
import { useState } from "react";
import like from "../assets/heart.png";

interface RecipeDetailsProps {
  opened: boolean;
  onClose: () => void;
  recipe: {
    title: string;
    author: string;
    image?: string;
    description: string;
    ingredients: string[];
    steps: string;
    likes: number;
    comments: { author: string; text: string }[];
  };
}

export const RecipeDetails = ({
  opened,
  onClose,
  recipe,
}: RecipeDetailsProps) => {
  const [likes, setLikes] = useState(recipe.likes);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <Title
            order={3}
            style={{ fontFamily: "'Pacifico', cursive", color: "#3e2723" }}
          >
            {recipe.title}
          </Title>
          <Text size="sm" style={{ fontWeight: 600, color: "#7a6c5d" }}>
            por {recipe.author}
          </Text>
        </Group>
      }
      size="lg"
      centered
      overlayProps={{ blur: 2 }}
      radius={16}
    >
      <ScrollArea h={400} p="md">
        {recipe.image && (
          <Image
            src={recipe.image}
            alt={recipe.title}
            radius="md"
            fit="contain"
            mb="md"
            style={{
              maxHeight: 180,
              margin: "0 auto",
              display: "block",
              background: "#fdf6ec",
            }}
          />
        )}
        <Text
          size="md"
          style={{ color: "#5d4037", fontWeight: 500, marginBottom: 12 }}
        >
          {recipe.description}
        </Text>
        <Divider my={8} label="Ingredientes" labelPosition="center" />
        <List size="sm" spacing={4} style={{ marginBottom: 12 }}>
          {recipe.ingredients.map((item, idx) => (
            <List.Item key={idx}>{item}</List.Item>
          ))}
        </List>
        <Divider my={8} label="Modo de preparo" labelPosition="center" />
        <Text size="sm" style={{ color: "#5d4037", marginBottom: 16 }}>
          {recipe.steps}
        </Text>
        <Group gap={8} mb={16}>
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
            <img src={like} alt="like" style={{ width: 18, height: 18 }} />
          </Button>
          <Text size="sm" style={{ fontWeight: 700, color: "#d2691e" }}>
            {likes}
          </Text>
        </Group>
        <Divider my={8} label="Comentários" labelPosition="center" />
        {recipe.comments.length === 0 ? (
          <Text size="xs" color="dimmed">
            Nenhum comentário ainda.
          </Text>
        ) : (
          recipe.comments.map((comment, idx) => (
            <div key={idx} style={{ marginBottom: 8 }}>
              <Text size="xs" color="#7a6c5d" fw={700}>
                {comment.author}
              </Text>
              <Text size="sm">{comment.text}</Text>
            </div>
          ))
        )}
      </ScrollArea>
    </Modal>
  );
};
