import { useState, useMemo } from 'react';
import { useTodos } from '@/app/hooks/useTodos';
import { TodoForm } from '@/app/components/TodoForm';
import { TodoList } from '@/app/components/todo-list';
import { TodoFilters } from '@/app/components/todo-filters';
import { TodoStats } from '@/app/components/todo-stats';
import { EmptyState } from '@/app/components/empty-state';
import { Button } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { FilterType, Todo } from '@/app/types/todo';

export default function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete, clearCompleted } = useTodos();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');

  // Filter todos based on current filter
  const filteredTodos = useMemo(() => {
    switch (currentFilter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, currentFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [todos]);

  const handleCreateTodo = () => {
    setEditingTodo(null);
    setIsFormOpen(true);
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">
                📋 My Todo App
              </h1>
              <p className="text-gray-600">
                Organize your tasks and boost your productivity
              </p>
            </div>
            <Button
              onClick={handleCreateTodo}
              size="lg"
              className="gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <Plus className="size-5" />
              <span className="hidden sm:inline">New Todo</span>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        {todos.length > 0 && (
          <div className="mb-8">
            <TodoStats
              total={stats.total}
              completed={stats.completed}
              active={stats.active}
            />
          </div>
        )}

        {/* Main Content */}
        {todos.length === 0 ? (
          <EmptyState onCreateTodo={handleCreateTodo} />
        ) : (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
              <TodoFilters
                currentFilter={currentFilter}
                onFilterChange={setCurrentFilter}
                counts={{
                  all: stats.total,
                  active: stats.active,
                  completed: stats.completed,
                }}
              />
              
              {stats.completed > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="size-4" />
                  Clear Completed
                </Button>
              )}
            </div>

            <Separator />

            {/* Todo List */}
            <TodoList
              todos={filteredTodos}
              onToggle={toggleComplete}
              onEdit={handleEditTodo}
              onDelete={deleteTodo}
              filterType={currentFilter}
            />
          </div>
        )}

        {/* Todo Form Dialog */}
        <TodoForm
          open={isFormOpen}
          onOpenChange={handleFormClose}
          onSubmit={addTodo}
          onUpdate={updateTodo}
          editTodo={editingTodo}
        />
      </div>

      {/* Footer */}
      <footer className="mt-16 pb-8 text-center text-sm text-gray-500">
        <p>Built with React, TypeScript & LocalStorage</p>
        <p className="mt-1">Full CRUD Todo Application</p>
      </footer>
    </div>
  );
}
