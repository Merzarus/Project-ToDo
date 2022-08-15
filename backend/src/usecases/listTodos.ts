import { Todo } from "@prisma/client";
import { prisma } from "../infra/database/client";

type Params = {}

export const handle = async (params: Params): Promise<Todo[]> => {
    return await prisma.todo.findMany();
} 

export default {
    handle
}
