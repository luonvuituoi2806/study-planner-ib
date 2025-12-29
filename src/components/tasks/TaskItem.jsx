import { Edit2, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { dateHelpers } from "../../utils/dateHelpers";

export default function TaskItem({ task, onEdit, onDelete, onComplete }) {
  const urgency = dateHelpers.getUrgencyLevel(task.deadline);
  const isCompleted = task.status === "completed";

  const getUrgencyStyles = () => {
    if (isCompleted) {
      return "bg-green-50 border-green-200";
    }

    switch (urgency.level) {
      case "overdue":
        return "bg-red-50 border-red-300";
      case "critical":
      case "urgent":
        return "bg-orange-50 border-orange-300";
      case "soon":
        return "bg-yellow-50 border-yellow-300";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getUrgencyBadge = () => {
    if (isCompleted) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <CheckCircle className="w-3 h-3" />
          Completed
        </span>
      );
    }

    const colors = {
      overdue: "bg-red-100 text-red-700",
      critical: "bg-red-100 text-red-700",
      urgent: "bg-orange-100 text-orange-700",
      soon: "bg-yellow-100 text-yellow-700",
      upcoming: "bg-blue-100 text-blue-700",
      future: "bg-gray-100 text-gray-700",
    };

    const Icon = urgency.level === "overdue" ? AlertCircle : Clock;

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          colors[urgency.level]
        }`}
      >
        <Icon className="w-3 h-3" />
        {urgency.label}
      </span>
    );
  };

  const handleDelete = () => {
    if (window.confirm(`Delete task "${task.name}"?`)) {
      onDelete(task.id);
    }
  };

  return (
    <div
      className={`border-2 rounded-lg p-3 sm:p-4 transition-all ${getUrgencyStyles()} ${
        isCompleted ? "opacity-75" : ""
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
        <div className="flex-1 min-w-0 w-full">
          {/* Task Name */}
          <h3
            className={`font-semibold text-gray-900 mb-1 text-sm sm:text-base ${
              isCompleted ? "line-through" : ""
            }`}
          >
            {task.name}
          </h3>

          {/* Task Details */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-gray-600 mb-2">
            <span className="font-medium text-blue-600">{task.subject}</span>
            <span className="hidden sm:inline">•</span>
            <span>{dateHelpers.minutesToHoursString(task.estimatedTime)}</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Due: {dateHelpers.formatDate(task.deadline, "MMM d, yyyy")}
            </span>
          </div>

          {/* Urgency Badge */}
          {getUrgencyBadge()}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2 w-full sm:w-auto justify-end sm:justify-start border-t sm:border-t-0 pt-2 sm:pt-0 mt-2 sm:mt-0">
          {!isCompleted && (
            <button
              onClick={() => onComplete(task.id)}
              className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
              title="Mark as complete"
            >
              <CheckCircle className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-5 h-5" />
          </button>

          <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Additional Info for Overdue */}
      {urgency.level === "overdue" && (
        <div className="mt-3 pt-3 border-t border-red-200">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ This task is {Math.abs(dateHelpers.daysUntil(task.deadline))}{" "}
            days overdue
          </p>
        </div>
      )}
    </div>
  );
}
