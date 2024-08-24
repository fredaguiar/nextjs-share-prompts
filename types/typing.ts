type TPostPromptCard = {
  _id: string;
  prompt: string;
  tag: string;
  creator: {
    _id: string;
    email: string;
    username: string;
    image: string;
  };
};

type TPrompt = {
  _id: string;
  prompt: string;
  tag: string;
};
