import { Todo } from "@prisma/client";
import { prisma } from "../infra/database/client";

type Params = {
    id: number;
}

export const validateParams = (params: Partial<Params>): Params | false => {
    if (!params.id || typeof params.id !== "number")
        return false;
    return params as Params;
}

export const handle = async (params: Params): Promise<Todo | null> => {
    return await prisma.todo.findUnique({
        where: {
            id: params.id
        }
    });
} 

export default {
    validateParams,
    handle
}
