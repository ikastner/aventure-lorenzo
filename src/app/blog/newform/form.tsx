'use client';

import { FormData } from '@/lib/blog';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

const inputClass =
  'w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300';

const FormNewPost = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  });
  const { data } = useSession();
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('api/posts', formData);

      if (response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <form className='max-w-md mx-auto p-4' onSubmit={handleSubmit}>
      <h1 className="text-3xl font-bold mb-8 text-center">Nouveau post</h1>
      <div className='mb-4'>
        <input
          type='text'
          className={inputClass}
          placeholder='Entrer un titre'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className='mb-4'>
        <ReactTextareaAutosize
          minRows={5}
          name='content'
          className={inputClass}
          placeholder='Entrer un contenu'
          value={formData.content}
          onChange={handleChange}
        />
      </div>
      <button
        disabled={!data?.user?.email}
        type='submit'
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400'
      >
        Publier
      </button>
    </form>
  );
};

export default FormNewPost;
