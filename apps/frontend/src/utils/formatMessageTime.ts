export const formatMessageTime = (date: string | Date | null) => {
  if (!date) return "";

  const messageDate = new Date(date);
  const now = new Date();

  const isToday =
    messageDate.getDate() === now.getDate() &&
    messageDate.getMonth() === now.getMonth() &&
    messageDate.getFullYear() === now.getFullYear();

  const isYesterday =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 1,
    ).toDateString() === messageDate.toDateString();

  if (isToday) {
    return messageDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isYesterday) {
    return "Yesterday";
  }

  return messageDate.toLocaleDateString([], {
    day: "2-digit",
    month: "2-digit",
  });
};
