type Attachment = {
  title: string;
  text?: string;
  imageurl?: string;
};

export const sendMessage = async (url: string, attachments?: Attachment[]) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      botName: "밥먹으러 갈까요🍚",
      attachments,
    }),
  });

  return result.json();
};
