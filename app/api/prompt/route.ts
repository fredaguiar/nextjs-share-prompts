import Prompt from '@model/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req: Request, _res: Response) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to get prompt', { status: 500 });
  }
};
