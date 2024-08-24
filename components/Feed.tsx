'use client';

import React, { useEffect, useState } from 'react';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';

type TPromptCardList = {
  data: TPostPromptCard[];
  handleTagClick: any;
};

const PromptCardList = ({ data, handleTagClick }: TPromptCardList) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<TPostPromptCard[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data: TPostPromptCard[] = await response.json();
      setPosts(data);
    };
    console.log('🚀 ~ Feed useEffect ~ session:', session);
    fetchPosts();
  }, []);

  const handleSearchChange = () => {};
  return (
    <section className="feed">
      <form onSubmit={undefined} className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
