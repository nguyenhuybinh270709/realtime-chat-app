import "dotenv/config";
import app from "@/app";
import { createServer } from "http";
import { initSocket } from "@/lib/socket";
import { setupSocket } from "@/sockets";

const PORT = process.env.PORT || 3000;

const server = createServer(app);

const io = initSocket(server);

setupSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
