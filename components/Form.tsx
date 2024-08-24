import Link from 'next/link';
import React, { Dispatch, FormEventHandler, SetStateAction } from 'react';

type TForm = {
  type: string;
  post: { prompt: string; tag: string; _id: string };
  setPost: Dispatch<SetStateAction<TPrompt>>;
  submitting: boolean;
  handleSubmit: any;
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: TForm) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share prompts with everyone. Powered by any AI-Platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">Your AI-prompt</span>
        </label>
        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          placeholder="Write your prompt here..."
          required
          className="form_textarea"
        />
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span className="font-normal">(#fullstack, #nextjs, #aiprompt)</span>
          </span>
        </label>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          placeholder="#tag"
          required
          className="form_input"
        />
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
            {submitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;