import { Button } from '@/app/components/ui/button';
import { CheckCircle2, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateTodo: () => void;
}

export function EmptyState({ onCreateTodo }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 relative">
        <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full" />
        <CheckCircle2 className="size-24 text-blue-600 relative" />
      </div>
      
      <h2 className="text-2xl mb-2 text-gray-900">Welcome to Your Todo App</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Stay organized and productive! Create your first todo to get started on your journey to success.
      </p>
      
      <Button onClick={onCreateTodo} size="lg" className="gap-2">
        <Plus className="size-5" />
        Create Your First Todo
      </Button>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
        <div className="p-4">
          <div className="size-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">📝</span>
          </div>
          <h3 className="font-medium mb-1">Create Tasks</h3>
          <p className="text-sm text-gray-600">Add todos with priority levels</p>
        </div>
        
        <div className="p-4">
          <div className="size-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">✅</span>
          </div>
          <h3 className="font-medium mb-1">Track Progress</h3>
          <p className="text-sm text-gray-600">Mark tasks as complete</p>
        </div>
        
        <div className="p-4">
          <div className="size-12 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-3">
            <span className="text-xl">🎯</span>
          </div>
          <h3 className="font-medium mb-1">Stay Organized</h3>
          <p className="text-sm text-gray-600">Filter and manage your todos</p>
        </div>
      </div>
    </div>
  );
}
