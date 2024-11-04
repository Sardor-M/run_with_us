import { Socket, Server } from "socket.io";
import { AwilixContainer } from "awilix";
import { CommentService } from "../services/CommentService";

export const socketHandler = (io: Server, container: AwilixContainer) => {

    io.on("connection", (socket: Socket) => {
        console.log("A user is connected", socket.id);

        // we create a scoped container for each socket connection
        const scope = container.createScope();

        const commentService = scope.resolve<CommentService>("commentService");
    
        socket.on("comment:add", async (data) => {
            try {
                const savedComment = await commentService.createComment(data);
                io.emit("comment:new", savedComment);
            } catch (error) {
                console.error("Error saving comment: ", error);
                socket.emit("comment:error", "Failed to save comment"); 
            }
        });

        socket.on("disconnect", () => {
            console.log("A user is disconnected", socket.id);
            scope.dispose();
        });
    });
}