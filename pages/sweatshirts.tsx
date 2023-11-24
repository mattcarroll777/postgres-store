import React from 'react';
import { GetStaticProps } from 'next';
import prisma from '../lib/prisma';
import Post, { PostProps } from '../components/Post';
import Layout from '../components/Layout';
import Router from 'next/router';

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
        <div className="listCont">
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
        .listCont {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 2px;
        }
      `}</style>
    </Layout>
  );
};

export default SweatShirts;
