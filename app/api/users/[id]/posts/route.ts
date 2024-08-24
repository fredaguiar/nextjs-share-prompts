import Prompt from '@model/prompt';
import { connectToDB } from '@utils/database';
import { Types } from 'mongoose';

export const GET = async (req: Request, { params }: { params: { id: Types.ObjectId } }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to get prompt', { status: 500 });
  }
};
