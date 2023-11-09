import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { TodoEntity } from 'src/entities/todo.entity';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { StatusEnum } from 'src/status.enum';
import { AuthMiddleware } from 'src/middlewares/auth-middleware/auth-middleware.middleware';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }

    @Post()
    @UseGuards(AuthMiddleware)
    addTodo(@Body() createTodoDto: CreateTodoDto, @Request() req) {
        createTodoDto.user = req.user;
        return this.todoService.addTodo(createTodoDto);
    }

    @Put(':id')
    @UseGuards(AuthMiddleware)
    async updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto, @Request() req) {
        const todo = this.todoService.getTodoById(id);
        if ((await todo).user.id !== req.body.userId) {
          throw new ForbiddenException('Vous n\'êtes pas autorisé à modifier ce todo');
        }
        return this.todoService.updateTodo(id, updateTodoDto);
    }

    @Delete(':id')
    @UseGuards(AuthMiddleware)
    async deleteTodo(@Param('id') id: number,  @Request() req) {
        const todo = this.todoService.getTodoById(id);
        if ((await todo).user.id !== req.body.userId) {
          throw new ForbiddenException('Vous n\'êtes pas autorisé à supprimer ce todo');
        }
        return this.todoService.deleteTodo(id);
    }

    @Delete('soft/:id')
    async softdeleteTodo(@Param('id') id: number) {
        return this.todoService.softDeleteTodo(id);
    }

    @Put('restore/:id')
    async restoreTodo(@Param('id') id: number) {
        return this.todoService.restoreTodo(id);
    }

    @Get('count/pending')
    async countPendingTodos(): Promise<number> {
        return this.todoService.countTodosByStatus(StatusEnum.PENDING);
    }

    @Get('count/inprogress')
    async countInProgressTodos(): Promise<number> {
        return this.todoService.countTodosByStatus(StatusEnum.IN_PROGRESS);
    }

    @Get('count/completed')
    async countCompletedTodos(): Promise<number> {
        return this.todoService.countTodosByStatus(StatusEnum.COMPLETED);
    }

    @Get('all')
    async getAllTodos(): Promise<TodoEntity[]> {
        return this.todoService.getAllTodos();
    }

    @Get()
    async getTodos(
        @Query('name') name?: string,
        @Query('description') description?: string,
        @Query('status') status?: StatusEnum,
    ): Promise<TodoEntity[]> {
        return this.todoService.getTodos(name, description, status);
    }

    @Get('/pag')
    async getPaginatedTodos(
        @Query('page') page: number,
        @Query('limit') limit: number
      ): Promise<TodoEntity[]> {
        return this.todoService.getPaginatedTodos(+page, +limit);
      }

      @Get(':id')
      async getTodoById(@Param('id') id: number): Promise<TodoEntity | null> {
          const todo = await this.todoService.getTodoById(id);
          if (!todo) {
              throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
          }
          return todo;
      }
  

    }