import express from "express";
import GetTodoUsecase from "./usecases/getTodo"
import ListTodosUsecase from "./usecases/listTodos"
import DeleteTodoUsecase from "./usecases/deleteTodo"
import UpdateTodoUsecase from "./usecases/updateTodo"
import CreateTodoUsecase from "./usecases/createTodo"

export const router = express.Router();

router.post("/todo", async (req, res, next) => {
    const params = CreateTodoUsecase.validateParams({
        data: req.body
    })
    if (!params){
        res.status(400).end();
        return;
    }
    const todo = await CreateTodoUsecase.handle(params);
    res.json(todo)
})

router.put("/todo/:id", async (req, res, next) => {
    const params = UpdateTodoUsecase.validateParams({
        id: parseInt(req.params.id),
        data: req.body
    })
    if (!params){
        res.status(400).end();
        return;
    }
    const doesTodoExist = !!await GetTodoUsecase.handle({id: params.id})
    if(!doesTodoExist){
        res.status(404).end();
        return;
    }
    const todo = await UpdateTodoUsecase.handle(params);
    res.json(todo)
})

router.delete("/todo/:id", async (req, res, next) => {
    const params = DeleteTodoUsecase.validateParams({
        id: parseInt(req.params.id)        
    })
    if (!params){
        res.status(400).end();
        return;
    }
    const doesTodoExist = !!await GetTodoUsecase.handle({id: params.id})
    if(!doesTodoExist){
        res.status(404).end();
        return;
    }
    const todo = await DeleteTodoUsecase.handle(params);
    if(!todo){
        res.status(404).end();
        return;
    }
    res.json(todo)
})

router.get("/todos", async (req, res, next) => {
    const todos = await ListTodosUsecase.handle({});
    res.json(todos)
})

router.get("/todo/:id", async (req, res, next) => {
    const params = GetTodoUsecase.validateParams({
        id: parseInt(req.params.id)        
    })
    if (!params){
        res.status(400).end();
        return;
    }
    const todo = await GetTodoUsecase.handle(params);
    if(!todo){
        res.status(404).end();
        return;
    }
    res.json(todo)
    
})
