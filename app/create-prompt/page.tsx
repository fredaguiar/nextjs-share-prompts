'use client';

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import React from 'react';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setSubmitting] = useState(false);

  const createPrompt = async (event: Event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({ prompt: post.prompt, userId: session?.user.id, tag: post.tag }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Create Prompt Error', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
