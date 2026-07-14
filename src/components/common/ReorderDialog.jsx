import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GripVertical } from 'lucide-react';

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  };

  return (
  <div
  ref={setNodeRef}
  style={style}
  className={`flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border rounded-lg mb-2 ${
    isDragging
      ? "shadow-lg border-primary"
      : "border-gray-200 dark:border-slate-700"
  }`}
>
  <div
    {...attributes}
    {...listeners}
    className="cursor-grab hover:text-primary dark:hover:text-primary"
  >
    <GripVertical className="h-5 w-5 text-gray-400 dark:text-gray-500" />
  </div>

  <div className="flex-1 truncate dark:text-gray-300">
    {children}
  </div>
</div>
  );
};

const ReorderDialog = ({ 
  isOpen, 
  onClose, 
  items = [], 
  title = "Reorder Items", 
  onSave,
  displayKey = "title" // Key to display in the list (e.g., "title", "name")
}) => {
  const [localItems, setLocalItems] = useState(items);
  const [loading, setLoading] = useState(false);

  // Sync local items when prop items change
  useEffect(() => {
    setLocalItems(items);
  }, [items, isOpen]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    setLocalItems((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      if (oldIndex === -1 || newIndex === -1) {
        return items;
      }

      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const orderedIds = localItems.map(item => item.id);
      await onSave(orderedIds);
      onClose();
    } catch (error) {
      console.error("Failed to save order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
 <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="max-w-md max-h-[80vh] flex flex-col dark:bg-slate-900 dark:border-slate-700">
    
    <DialogHeader>
      <DialogTitle className="dark:text-white">
        {title}
      </DialogTitle>
    </DialogHeader>

    <div className="flex-1 overflow-y-auto pr-2 py-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={localItems.map(item => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {localItems.map((item) => (
            <SortableItem key={item.id} id={item.id}>
              <span className="font-medium dark:text-gray-300">
                {item[displayKey]}
              </span>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>

    <DialogFooter>
      <Button
        variant="outline"
        onClick={onClose}
        disabled={loading}
        className="dark:border-slate-700 dark:text-gray-300"
      >
        Cancel
      </Button>

      <Button onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "Save Order"}
      </Button>
    </DialogFooter>

  </DialogContent>
</Dialog>
  );
};

export default ReorderDialog;
