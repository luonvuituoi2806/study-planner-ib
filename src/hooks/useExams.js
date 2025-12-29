import { useState, useEffect, useCallback } from "react";
import { examService } from "../services/examService";
import { useAuth } from "./useAuth";
import { dateHelpers } from "../utils/dateHelpers";
import toast from "react-hot-toast";

/**
 * Custom hook for managing exams
 * Provides CRUD operations and exam-specific utilities
 */
export function useExams() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all exams
  const fetchExams = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const data = await examService.getUserExams(user.uid);
      setExams(data);
    } catch (err) {
      console.error("Error fetching exams:", err);
      setError(err.message);
      toast.error("Failed to load exams");
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch exams on mount
  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  // Create new exam
  const createExam = async (examData) => {
    try {
      const newExam = await examService.createExam(user.uid, examData);
      setExams([...exams, newExam]);
      toast.success("Exam created successfully");
      return { success: true, exam: newExam };
    } catch (err) {
      console.error("Error creating exam:", err);
      toast.error("Failed to create exam");
      return { success: false, error: err.message };
    }
  };

  // Update existing exam
  const updateExam = async (examId, updates) => {
    try {
      await examService.updateExam(examId, updates);
      setExams(exams.map((e) => (e.id === examId ? { ...e, ...updates } : e)));
      toast.success("Exam updated successfully");
      return { success: true };
    } catch (err) {
      console.error("Error updating exam:", err);
      toast.error("Failed to update exam");
      return { success: false, error: err.message };
    }
  };

  // Delete exam
  const deleteExam = async (examId) => {
    try {
      await examService.deleteExam(examId);
      setExams(exams.filter((e) => e.id !== examId));
      toast.success("Exam deleted successfully");
      return { success: true };
    } catch (err) {
      console.error("Error deleting exam:", err);
      toast.error("Failed to delete exam");
      return { success: false, error: err.message };
    }
  };

  // Get upcoming exams only
  const getUpcomingExams = useCallback(() => {
    return exams.filter((e) => !dateHelpers.isPast(e.date));
  }, [exams]);

  // Get past exams
  const getPastExams = useCallback(() => {
    return exams.filter((e) => dateHelpers.isPast(e.date));
  }, [exams]);

  // Get exams by subject
  const getExamsBySubject = useCallback(
    (subject) => {
      return exams.filter((e) => e.subject === subject);
    },
    [exams]
  );

  // Get exams this week
  const getExamsThisWeek = useCallback(() => {
    return exams.filter((e) => dateHelpers.isThisWeek(e.date));
  }, [exams]);

  // Get next exam
  const getNextExam = useCallback(() => {
    const upcoming = getUpcomingExams();
    if (upcoming.length === 0) return null;

    return upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];
  }, [getUpcomingExams]);

  return {
    exams,
    loading,
    error,
    fetchExams,
    createExam,
    updateExam,
    deleteExam,
    getUpcomingExams,
    getPastExams,
    getExamsBySubject,
    getExamsThisWeek,
    getNextExam,
  };
}

export default useExams;
