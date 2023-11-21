import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

export type PostProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div>
      <div>
        <Image priority src={post.imgUrl} height={200} width={200} />
      </div>
      <h2>{post.name}</h2>
      <small>$ {post.price}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
