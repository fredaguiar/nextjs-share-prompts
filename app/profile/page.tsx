'use client';

import Profile from '@components/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MyProfile = () => {
  const [searchText, setSearchText] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<TPostPromptCard[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data: TPostPromptCard[] = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post: TPostPromptCard) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post: TPostPromptCard) => {
    const confirmed = confirm('Delete?');
    if (confirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const filteredPosts = posts.filter((p) => p._id !== post._id);
          setPosts(filteredPosts);
        } else {
          alert('Could not be deleted');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="You can edit and delete prompts here"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
