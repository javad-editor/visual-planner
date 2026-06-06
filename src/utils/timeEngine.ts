/**
 * Converts a raw number of minutes (e.g., 120) into a clean string (e.g., "2 hours")
 */
export function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  return `${minutes} min`;
}

/**
 * Calculates if a task is 'completed', 'active', or 'upcoming' based on the real-world clock
 */
export function getTaskStatus(timeString: string, durationMinutes: number): "completed" | "active" | "upcoming" {
  const now = new Date();
  const currentTotalMins = now.getHours() * 60 + now.getMinutes();

  // Parse "09:00" into total minutes from midnight
  const [taskHours, taskMins] = timeString.split(':').map(Number);
  const taskStartTotalMins = taskHours * 60 + taskMins;
  const taskEndTotalMins = taskStartTotalMins + durationMinutes;

  if (currentTotalMins >= taskEndTotalMins) return "completed";
  if (currentTotalMins >= taskStartTotalMins && currentTotalMins < taskEndTotalMins) return "active";
  return "upcoming";
}