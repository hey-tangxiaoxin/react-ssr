import { Router } from "express";
import OpenAI from "openai";

const router = Router();

const openai = new OpenAI({
  apiKey: "fdf54123-e652-4a69-b463-a58677a61790",
  baseURL: "https://ark.cn-beijing.volces.com/api/v3",
});

router.get("/", async (req, res) => {
  const { body } = req;
  console.log("----body----", body);
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });
  try {
    const stream = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "你是人工智能助手" },
        { role: "user", content: "常见的十字花科植物有哪些？" },
      ],
      model: "deepseek-r1-250120",
      stream: true,
    });

    res.write(`data: ${JSON.stringify({ content: "正在思考……" })}\n\n`);
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        // 发送SSE格式的数据
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // 发送结束标记
    res.write("data: [DONE]\n\n");
  } catch (error) {
    console.error("Error:", error);
    res.write(`data: ${JSON.stringify({ error: "An error occurred" })}\n\n`);
  }
});

export default router;
