import { useState } from "react";
import { postRecipe } from "../services/recipeService";

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

export const AddRecipeForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<string>("");
  const [steps, setSteps] = useState("");
  const [imageBase64, setImageBase64] = useState<string>();
  const [imageMimeType, setImageMimeType] = useState<string>();
  const [imagePreview, setImagePreview] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setImageBase64(base64.split(",")[1]);
      setImageMimeType(file.type);
      setImagePreview(base64);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await postRecipe({
        title,
        description,
        ingredients: ingredients
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean),
        steps,
        imageBase64,
        imageMimeType,
        authorId: localStorage.getItem("userId") || "",
      });
      setTitle("");
      setDescription("");
      setIngredients("");
      setSteps("");
      setImageBase64(undefined);
      setImageMimeType(undefined);
      setImagePreview(undefined);
      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 32,
        background: "#f8f8f8",
        padding: 32,
        borderRadius: 20,
        boxShadow: "0 4px 24px rgba(85, 107, 47, 0.10)",
        maxWidth: 500,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <label style={{ fontWeight: 600, color: "#5d4037" }}>Título*</label>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{
          width: "100%",
          marginBottom: 16,
          padding: 10,
          borderRadius: 10,
          border: "1.5px solid #cfe1b9",
          fontSize: 16,
          outline: "none",
        }}
      />
      <label style={{ fontWeight: 600, color: "#5d4037" }}>Descrição</label>
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "100%",
          marginBottom: 16,
          padding: 10,
          borderRadius: 10,
          border: "1.5px solid #cfe1b9",
          fontSize: 15,
          minHeight: 40,
          outline: "none",
        }}
      />
      <label style={{ fontWeight: 600, color: "#5d4037" }}>
        Ingredientes*{" "}
        <span style={{ fontWeight: 400, color: "#7a6c5d" }}>
          (um por linha)
        </span>
      </label>
      <textarea
        placeholder="Ingredientes (um por linha)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
        style={{
          width: "100%",
          marginBottom: 16,
          padding: 10,
          borderRadius: 10,
          border: "1.5px solid #cfe1b9",
          fontSize: 15,
          minHeight: 60,
          outline: "none",
        }}
      />
      <label style={{ fontWeight: 600, color: "#5d4037" }}>
        Modo de preparo*
      </label>
      <textarea
        placeholder="Modo de preparo"
        value={steps}
        onChange={(e) => setSteps(e.target.value)}
        required
        style={{
          width: "100%",
          marginBottom: 16,
          padding: 10,
          borderRadius: 10,
          border: "1.5px solid #cfe1b9",
          fontSize: 15,
          minHeight: 60,
          outline: "none",
        }}
      />
      <label style={{ fontWeight: 600, color: "#5d4037" }}>Imagem</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          marginBottom: 16,
          display: "block",
          outline: "none",
        }}
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Pré-visualização"
          style={{
            maxWidth: "100%",
            maxHeight: 180,
            borderRadius: 12,
            marginBottom: 16,
            boxShadow: "0 2px 8px rgba(85, 107, 47, 0.08)",
            background: "#fdf6ec",
            padding: 8,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      )}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px 0",
          borderRadius: 10,
          background: "#cfe1b9",
          color: "#3e2723",
          border: "none",
          fontWeight: 700,
          fontSize: 18,
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: 8,
          boxShadow: "0 2px 8px rgba(85, 107, 47, 0.08)",
          transition: "background 0.2s",
        }}
      >
        {loading ? "Salvando..." : "Adicionar Receita"}
      </button>
    </form>
  );
};
