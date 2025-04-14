import { useState } from "react";

export interface Task {
  title: string;
  status: string;
  indexCard: number;
}

export const useDragDrop = (initialTasks: Omit<Task, 'indexCard'>[]) => {
  // Adiciona indexCard a cada task
  const [tasks, setTasks] = useState<Task[]>(
    initialTasks.map((task, index) => ({
      ...task,
      indexCard: index
    }))
  );
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const onDrop = (status: string, position: number) => {
    if (activeCard === null) return;

    setTasks((prevTasks) => {
      const taskToMove = prevTasks.find((task) => task.indexCard === activeCard);
      if (!taskToMove) return prevTasks;

      const filteredTasks = prevTasks.filter(
        (task) => task.indexCard !== taskToMove.indexCard
      );

      return [
        ...filteredTasks.slice(0, position),
        { ...taskToMove, status },
        ...filteredTasks.slice(position),
      ];
    });
  };

  return {
    tasks,
    setTasks,
    activeCard,
    setActiveCard,
    dragOver,
    setDragOver,
    onDrop,
  };
};