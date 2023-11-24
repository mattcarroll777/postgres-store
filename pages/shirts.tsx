import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Post, { PostProps } from '../components/Post';
import Layout from '../components/Layout';
import Router from 'next/router';

export const getStaticProps: GetStaticProps = async () => {
  const allProducts = await prisma.product.findMany({
    include: {
      shirts: true,
    },
  });
  const shirts = allProducts[0].shirts;
  return {
    props: { shirts },
    revalidate: 10,
  };
};

type Props = {
  shirts: PostProps[];
};
const Shirts: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>All Shirts</h1>
        <div className="listCont">
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
      </div>
      <style jsx>{`
        .listCont {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 2px;
        }
      `}</style>
    </Layout>
  );
};

export default Shirts;
