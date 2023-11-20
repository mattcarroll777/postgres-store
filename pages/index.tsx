import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';
import Router from 'next/router';

export const getStaticProps: GetStaticProps = async () => {
  const allProducts = await prisma.product.findMany({
    include: {
      shirts: true,
      sweatShirts: true,
    },
  });
  const shirts = allProducts[0].shirts;
  const sweatShirts = allProducts[0].sweatShirts;

  const feed = [shirts, sweatShirts];
  return {
    props: { shirts, sweatShirts },
    revalidate: 10, // page regenerates every "10" seconds add new data from the server -- Incremental Static Regeneration
  };
};

type Props = {
  shirts: PostProps[];
  sweatShirts: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Shirts</h1>
        <h4 onClick={() => Router.push('/shirts')}>All Shirts</h4>
        <div className="list">
          {props.shirts.map((post) => (
            <div key={post.id} className="post">
              <div
                onClick={() =>
                  Router.push('/shirts/[id]', `/shirts/${post.id}`)
                }
              >
                <Post post={post} />
              </div>
            </div>
          ))}
        </div>
        <h1>SweatShirts</h1>
        <h4 onClick={() => Router.push('/sweatshirts')}> All SweatShirts </h4>
        <div className="list">
          {props.sweatShirts.map((post) => (
            <div key={post.id} className="post">
              <div
                onClick={() =>
                  Router.push('/sweatshirts/[id]', `/sweatshirts/${post.id}`)
                }
              >
                <Post post={post} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .list {
          display: flex;
          overflow-x: auto;
          height: 400px;
          white-space: nonwrap;
        }
        .post {
          flex: none;
          width: 200px;
          margin-right: 10px;
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;
