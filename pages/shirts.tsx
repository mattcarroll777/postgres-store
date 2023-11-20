import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Post, { PostProps } from '../components/Post';
import Layout from '../components/Layout';

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
        <div>
          {props.shirts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shirts;
