import { TodoItem } from '@/app/components/todo-item';
import { Todo } from '@/app/types/todo';
import { FileQuestion } from 'lucide-react';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  filterType: 'all' | 'active' | 'completed';
}

export function TodoList({ todos, onToggle, onEdit, onDelete, filterType }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FileQuestion className="size-16 text-gray-300 mb-4" />
        <h3 className="text-lg text-gray-600 mb-2">
          {filterType === 'all' && 'No todos yet'}
          {filterType === 'active' && 'No active todos'}
          {filterType === 'completed' && 'No completed todos'}
        </h3>
        <p className="text-sm text-gray-400">
          {filterType === 'all' && 'Create your first todo to get started!'}
          {filterType === 'active' && 'All tasks are completed. Great job!'}
          {filterType === 'completed' && 'Complete some tasks to see them here'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
