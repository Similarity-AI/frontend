import { type ApiType } from "../types/ApiType";

export async function searchSimilarity(
  question: string,
): Promise<ApiType | undefined> {
  try {
    const safeQuestion = encodeURIComponent(question);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/search?q=${safeQuestion}`,
    );

    if (!response.ok) {
      throw new Error(`Erro do servidor: status ${response.status}`);
    }

    const data = await response.json();

    console.log("Dados recebidos:", data);
    return data;
  } catch (error) {
    console.error("Falha na requisição:", error);
    throw error;
  }
}
