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
    <div className="mainCont">
      <div className="dataCont">
        <div>
          <Image priority src={post.imgUrl} height={200} width={200} />
        </div>
        <h2>{post.name}</h2>
        <small>$ {post.price}</small>
      </div>
      <style jsx>{`
        .mainCont {
          color: inherit;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Post;
