import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { FilterType } from '@/app/types/todo';
import { ListTodo, CheckCircle2, Circle } from 'lucide-react';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function TodoFilters({ currentFilter, onFilterChange, counts }: TodoFiltersProps) {
  const filters: { value: FilterType; label: string; icon: React.ReactNode }[] = [
    { value: 'all', label: 'All', icon: <ListTodo className="size-4" /> },
    { value: 'active', label: 'Active', icon: <Circle className="size-4" /> },
    { value: 'completed', label: 'Completed', icon: <CheckCircle2 className="size-4" /> },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className="gap-2"
        >
          {filter.icon}
          {filter.label}
          <Badge 
            variant="secondary" 
            className={currentFilter === filter.value ? 'bg-white/20' : ''}
          >
            {counts[filter.value]}
          </Badge>
        </Button>
      ))}
    </div>
  );
}
