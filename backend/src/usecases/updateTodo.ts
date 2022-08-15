import { Todo } from "@prisma/client";
import { prisma } from "../infra/database/client";

type Params = {
    id: number;
    data: Partial<Todo>;
}

const validStatuses = ["NOT_DONE", "DONE"]

const validateData = (data: Params["data"]): Params["data"] | false => {
    if (data.title && typeof data.title !== "string")
        return false;
    if (data.status && !validStatuses.includes(data.status))
        return false;
    return data;
    
}

export const validateParams = (params: Partial<Params>): Params | false => {
    if (!params.id || typeof params.id !== "number")
        return false;
    if (!params.data || !validateData(params.data))
        return false;
    return params as Params;
}

export const handle = async (params: Params): Promise<Todo | null> => {
    return await prisma.todo.update({
        where: {
            id: params.id
        },
        data: params.data
    });
} 

export default {
    validateParams,
    handle
}
