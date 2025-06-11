import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import granmotherImg from "../assets/grandmother.png";
import { login, registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  const loginForm = useForm({
    initialValues: { username: "", password: "" },
  });

  const registerForm = useForm({
    initialValues: { username: "", password: "" },
  });

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await login(values);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("username", response.data.username);
      notifications.show({
        title: "Login",
        message: "Você entrou com sucesso!",
        color: "green",
      });
      navigate("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        notifications.show({
          title: "Erro",
          message: "Usuário ou senha inválidos.",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Erro",
          message: "Não foi possível fazer login.",
          color: "red",
        });
      }
    }
  };

  const handleRegister = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await registerUser(values);
      notifications.show({
        title: "Cadastro",
        message: "Conta criada com sucesso!",
        color: "teal",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        notifications.show({
          title: "Erro",
          message: "Este usuário já existe.",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Erro",
          message: "Não foi possível cadastrar.",
          color: "red",
        });
      }
    }
  };

  return (
    <Container
      size={700}
      style={{
        minHeight: "100vh",
        background: "transparent",
        borderRadius: 20,
        boxShadow: "none",
        padding: 0,
        border: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Title
        style={{
          textAlign: "center",
          background: "linear-gradient(90deg, #3e2723 0%, #3e2723 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "'Pacifico', cursive, sans-serif",
          textShadow: "2px 2px 8px rgba(255, 176, 133, 0.15)",
          letterSpacing: 1,
          marginBottom: "32px",
        }}
        fw={700}
      >
        Receita de Vó{" "}
        <span
          style={{
            WebkitBackgroundClip: "unset",
            WebkitTextFillColor: "unset",
            background: "unset",
            color: "unset",
          }}
        >
          🍲
        </span>
      </Title>
      <Paper
        withBorder
        shadow="md"
        p={32}
        radius="md"
        style={{
          minWidth: 340,
          maxWidth: 400,
          width: "100%",
          minHeight: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(value) => setActiveTab(value as "login" | "register")}
          color="olive"
        >
          <Tabs.List grow>
            <Tabs.Tab value="login">Login</Tabs.Tab>
            <Tabs.Tab value="register">Cadastro</Tabs.Tab>
          </Tabs.List>

          <span
            style={{
              fontSize: 64,
              marginBottom: 0,
              marginTop: 8,
              display: "flex",
              justifyContent: "center",
              userSelect: "none",
              alignItems: "center",
              width: "100%",
            }}
            role="img"
            aria-label="panela"
          >
            <img
              src={granmotherImg}
              alt="icone de vovó"
              width={100}
              style={{
                marginTop: "20px",
              }}
            />
          </span>
          <Tabs.Panel value="login">
            <form onSubmit={loginForm.onSubmit(handleLogin)}>
              <TextInput
                label="Usuário"
                placeholder="Vovó Daura"
                required
                {...loginForm.getInputProps("username")}
                styles={{
                  input: {
                    borderColor: "#556b2f",
                    boxShadow: "0 0 0 0.3px #556b2f",
                    background: "#fdf6ec",
                    borderRadius: 8,
                  },
                }}
              />
              <PasswordInput
                label="Senha"
                placeholder="Sua senha segura"
                required
                mt="md"
                {...loginForm.getInputProps("password")}
                styles={{
                  input: {
                    borderColor: "#556b2f",
                    boxShadow: "0 0 0 0.3px #556b2f",
                    background: "#fdf6ec",
                    borderRadius: 8,
                  },
                }}
                style={{
                  paddingBottom: "16px",
                }}
              />
              <Button
                fullWidth
                mt="xl"
                type="submit"
                style={{
                  background: "#ffb347",
                  color: "#3e2723",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#ffc76b")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#ffb347")
                }
              >
                Entrar
              </Button>
              <div
                style={{
                  marginTop: 30,
                  color: "#3e2723",
                  fontSize: 13,
                  opacity: 0.7,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                © 2025 Desenvolvido por Petterson
              </div>
            </form>
          </Tabs.Panel>
          <Tabs.Panel value="register">
            <form onSubmit={registerForm.onSubmit(handleRegister)}>
              <TextInput
                label="Usuário"
                placeholder="Vovó Daura"
                required
                {...registerForm.getInputProps("username")}
                styles={{
                  input: {
                    borderColor: "#556b2f",
                    boxShadow: "0 0 0 0.3px #556b2f",
                    background: "#fdf6ec",
                    borderRadius: 8,
                  },
                }}
              />
              <PasswordInput
                label="Senha"
                placeholder="Sua senha segura"
                required
                mt="md"
                {...registerForm.getInputProps("password")}
                styles={{
                  input: {
                    borderColor: "#556b2f",
                    boxShadow: "0 0 0 0.3px #556b2f",
                    background: "#fdf6ec",
                    borderRadius: 8,
                  },
                }}
                style={{
                  paddingBottom: "16px",
                }}
              />
              <Button
                fullWidth
                mt="xl"
                type="submit"
                style={{
                  background: "#ffe066",
                  color: "#3e2723",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#fff3b0")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "#ffe066")
                }
              >
                Cadastrar
              </Button>
              <div
                style={{
                  marginTop: 30,
                  color: "#3e2723",
                  fontSize: 13,
                  opacity: 0.7,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                © 2025 Desenvolvido por Petterson
              </div>
            </form>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </Container>
  );
};
