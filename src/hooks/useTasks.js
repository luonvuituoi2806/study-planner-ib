import { useState, useEffect, useCallback } from "react";
import { taskService } from "../services/taskService";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

/**
 * Custom hook for managing tasks
 * Provides CRUD operations and real-time state management
 */
export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getUserTasks(user.uid);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError(err.message);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create new task
  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(user.uid, taskData);
      setTasks([...tasks, newTask]);
      toast.success("Task created successfully");
      return { success: true, task: newTask };
    } catch (err) {
      console.error("Error creating task:", err);
      toast.error("Failed to create task");
      return { success: false, error: err.message };
    }
  };

  // Update existing task
  const updateTask = async (taskId, updates) => {
    try {
      await taskService.updateTask(taskId, updates);
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, ...updates } : t)));
      toast.success("Task updated successfully");
      return { success: true };
    } catch (err) {
      console.error("Error updating task:", err);
      toast.error("Failed to update task");
      return { success: false, error: err.message };
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
      toast.success("Task deleted successfully");
      return { success: true };
    } catch (err) {
      console.error("Error deleting task:", err);
      toast.error("Failed to delete task");
      return { success: false, error: err.message };
    }
  };

  // Mark task as complete
  const completeTask = async (taskId) => {
    try {
      await taskService.markTaskComplete(taskId);
      setTasks(
        tasks.map((t) => (t.id === taskId ? { ...t, status: "completed" } : t))
      );
      toast.success("Task marked as complete");
      return { success: true };
    } catch (err) {
      console.error("Error completing task:", err);
      toast.error("Failed to complete task");
      return { success: false, error: err.message };
    }
  };

  // Get pending tasks only
  const getPendingTasks = useCallback(() => {
    return tasks.filter((t) => t.status === "pending");
  }, [tasks]);

  // Get completed tasks only
  const getCompletedTasks = useCallback(() => {
    return tasks.filter((t) => t.status === "completed");
  }, [tasks]);

  // Get tasks by subject
  const getTasksBySubject = useCallback(
    (subject) => {
      return tasks.filter((t) => t.subject === subject);
    },
    [tasks]
  );

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
    getPendingTasks,
    getCompletedTasks,
    getTasksBySubject,
  };
}

export default useTasks;
