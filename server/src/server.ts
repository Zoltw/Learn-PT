import app from "./app";
import { connectDatabase } from "./utils/database";
import { OpenAiService } from "./services/openAiService";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
