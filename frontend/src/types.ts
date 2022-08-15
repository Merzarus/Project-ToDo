export type TodoStatus = "NOT_DONE" | "DONE";

export type CompletionFilter = "all" | "completed" | "not-completed";

export type TodoApi = {
    id: number;
    title: string;
    status: TodoStatus;
}

export type Todo = {
    id: number;
    title: string;
    status: boolean;
}