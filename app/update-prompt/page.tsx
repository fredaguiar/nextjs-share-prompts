'use client';

import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import React from 'react';

const EditPrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState<TPrompt>({ prompt: '', tag: '', _id: '' });
  const [submitting, setSubmitting] = useState(false);
  const searchParams = useSearchParams();

  const promptId = searchParams.get('id');

  useEffect(() => {
    const getPrompt = async () => {
      const prompt = await fetch(`/api/prompt/${promptId}`);
      const data: TPrompt = await prompt.json();
      setPost(data);
    };
    if (promptId) getPrompt();
  }, [promptId]);

  const editPrompt = async (event: Event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Edit Prompt Error', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
};

export default EditPrompt;
