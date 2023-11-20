import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Post, { PostProps } from '../components/Post';
import Layout from '../components/Layout';

export const getStaticProps: GetStaticProps = async () => {
  const allProducts = await prisma.product.findMany({
    include: {
      sweatShirts: true,
    },
  });
  const sweatShirts = allProducts[0].sweatShirts;
  return {
    props: { sweatShirts },
    revalidate: 10,
  };
};

type Props = {
  sweatShirts: PostProps[];
};

const SweatShirts: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>All SweatShirts</h1>
        <div>
          {props.sweatShirts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SweatShirts;
