import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/dto/create-todo.dto';
import { UpdateTodoDto } from 'src/dto/update-todo.dto';
import { TodoEntity } from 'src/entities/todo.entity';
import { StatusEnum } from 'src/status.enum';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) { }

  async addTodo(createTodoDto: CreateTodoDto) {
    try {
      return await this.todoRepository.save(createTodoDto as unknown as DeepPartial<TodoEntity>);
    } catch (error) {
      throw new Error(`Impossible d'ajouter le Todo.`);
    }
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
    }
    Object.assign(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
    }
    try {
      await this.todoRepository.delete(id);
    } catch (error) {
      throw new Error(`Impossible de supprimer le Todo.`);
    }
  }

  async softDeleteTodo(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
    }

    await this.todoRepository.softDelete(id);
    return todo;
  }

  async restoreTodo(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Le Todo avec l'ID ${id} n'a pas été trouvé.`);
    }
    await this.todoRepository.restore(todo);
    return todo;
  }

  async countTodosByStatus(status: StatusEnum): Promise<number> {
    return this.todoRepository.count({ where: { status } });
  }

  async getAllTodos(): Promise<TodoEntity[]> {
    return this.todoRepository.find();
  }

  async getTodoById(id: number): Promise<TodoEntity | null> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async getTodos(name?: string, description?: string, status?: StatusEnum): Promise<TodoEntity[]> {
    const query = this.todoRepository.createQueryBuilder('todo');
    if (name) {
      query.andWhere('todo.name LIKE :name', { name: `%${name}%` });
    }
    if (description) {
      query.andWhere('todo.description LIKE :description', { description: `%${description}%` });
    }
    if (status) {
      query.andWhere('todo.status = :status', { status });
    }
    return query.getMany();
  }

  async getPaginatedTodos(page: number, limit: number): Promise<TodoEntity[]> {
    const skip = (page - 1) * limit;
    const todos = await this.todoRepository
      .createQueryBuilder('todo_entity')
      .skip(skip)
      .take(limit)
      .getMany();
    return todos;
  }

}
