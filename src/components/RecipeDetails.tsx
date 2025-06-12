import {
  Modal,
  Text,
  Group,
  Divider,
  Image,
  Title,
  List,
  ScrollArea,
  Avatar,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { postComment } from "../services/recipeService";
import { fetchUserById, getProfilePic } from "../services/userService";

interface Comment {
  user: string;
  text: string;
  createdAt?: string;
  _id?: string;
  author?: string;
  avatar?: string | null;
}

interface RecipeDetailsProps {
  opened: boolean;
  onClose: () => void;
  onRefresh: () => void;
  recipe: {
    id: string;
    title: string;
    author: string;
    image?: string;
    description: string;
    ingredients: string[];
    steps: string;
    likes: number;
    comments: Comment[];
  };
}

async function mapCommentsWithAuthor(comments: Comment[]) {
  return Promise.all(
    comments.map(async (comment) => {
      let authorName = comment.user;
      let avatar: string | null = null;
      try {
        const user = await fetchUserById(comment.user);
        authorName = user.username || comment.user;
        const profilePic = await getProfilePic(authorName);
        avatar = profilePic || null;
      } catch (error) {
        console.error(error);
      }
      return {
        ...comment,
        author: authorName,
        avatar,
      };
    })
  );
}
export const RecipeDetails = ({
  opened,
  onClose,
  onRefresh,
  recipe,
}: RecipeDetailsProps) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (opened) {
      mapCommentsWithAuthor(recipe.comments).then(setComments);
    }
  }, [opened, recipe.comments]);

  const handleComment = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    try {
      await postComment(recipe.id, comment);

      const authorName = localStorage.getItem("username") || "Você";
      let avatar: string | null = null;
      try {
        avatar = await getProfilePic(authorName);
      } catch {
        avatar = null;
      }

      setComments([
        ...comments,
        {
          user: authorName,
          text: comment,
          createdAt: new Date().toISOString(),
          author: authorName,
          avatar,
        },
      ]);
      setComment("");
      if (onRefresh) onRefresh();
    } finally {
      setLoading(false);
    }
  };

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
        <Divider my={8} label="Comentários" labelPosition="center" />
        <div
          style={{
            marginBottom: 12,
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva um comentário..."
            style={{
              width: "60%",
              height: "30px",
              marginLeft: "5px",
              padding: 8,
              borderRadius: 8,
              border: "1px solid #e0cfcf",
              marginRight: 8,
            }}
            disabled={loading}
          />
          <button
            onClick={handleComment}
            disabled={loading || !comment.trim()}
            style={{
              height: "30px",
              width: "110px",
              borderRadius: 8,
              background: "#cfe1b9",
              color: "#3e2723",
              border: "none",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Comentar
          </button>
        </div>

        {comments.length === 0 ? (
          <Text size="xs" style={{ color: "dimmed" }}>
            Nenhum comentário ainda.
          </Text>
        ) : (
          [...comments]
            .sort(
              (a, b) =>
                new Date(b.createdAt || "").getTime() -
                new Date(a.createdAt || "").getTime()
            )
            .map((comment, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Avatar
                  size={28}
                  radius="xl"
                  src={comment.avatar || undefined}
                  color="olive"
                  style={{ flexShrink: 0 }}
                >
                  {!comment.avatar && comment.author
                    ? comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : null}
                </Avatar>
                <div>
                  <Text size="xs" fw={700}>
                    {comment.author}
                  </Text>
                  <Text size="sm">{comment.text}</Text>
                </div>
              </div>
            ))
        )}
      </ScrollArea>
    </Modal>
  );
};
