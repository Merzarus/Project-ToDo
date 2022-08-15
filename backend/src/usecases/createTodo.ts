import { Todo } from "@prisma/client";
import { prisma } from "../infra/database/client";

type Params = {
    data: {
        title: string;
    };
}

const validateData = (data: Params["data"]): Params["data"] | false => {
    if (data.title && typeof data.title !== "string")
        return false;
    return data;
}

export const validateParams = (params: Partial<Params>): Params | false => {
    if (!params.data || !validateData(params.data))
        return false;
    return params as Params;
}

export const handle = async (params: Params): Promise<Todo | null> => {
    return await prisma.todo.create({
        data: params.data
    });
} 

export default {
    validateParams,
    handle
}
