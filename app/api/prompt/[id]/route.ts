import Prompt from '@model/prompt';
import { connectToDB } from '@utils/database';
import { Document } from 'mongoose';

export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Get prompt failed', { status: 500 });
  }
};

// update
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string; prompt: string; tag: string } }
) => {
  const { id, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const currentPrompt = await Prompt.findById<Document & TPrompt>(params.id);
    if (!currentPrompt) return new Response('Prompt not found', { status: 404 });

    currentPrompt.prompt = prompt;
    currentPrompt.tag = tag;
    await currentPrompt.save();

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Update prompt failed', { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Delete prompt failed', { status: 500 });
  }
};
