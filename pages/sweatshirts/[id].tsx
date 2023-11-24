import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { PostProps } from '../../components/Post';
import prisma from '../../lib/prisma';
import Image from 'next/image';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.sweatShirts.findUnique({
    where: {
      id: Number(params?.id),
    },
  });
  return {
    props: post,
  };
};

const Post: React.FC<PostProps> = (props) => {
  return (
    <Layout>
      <div className="shirtCont">
        <div className="imgWrap">
          <Image
            className="prodImg"
            priority
            src={props.imgUrl}
            height={500}
            width={500}
          />
        </div>
        <div className="infoCont">
          <div>
            <h1>{props.name}</h1>
          </div>
          <div className="descWrap">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nec
              pellentesque leo. Cras finibus felis eros, pretium porta sapien
              pharetra non. Quisque vitae tortor tristique, ornare ligula in,
              aliquet lorem. Nam auctor lobortis magna, a lacinia quam suscipit
              ac. Nam id eros fermentum leo lacinia volutpat vehicula et nibh.
              Nunc mi lacus, aliquet non egestas et, posuere non risus. Aliquam
              dignissim eros in velit iaculis, nec porttitor orci blandit. Cras
              in sapien vestibulum, faucibus felis ut, porta est. Integer
              lobortis convallis dictum. Praesent pharetra, diam quis ultricies
              egestas, sapien enim scelerisque purus, at posuere nisl nisl vel
              urna. Aliquam condimentum vulputate enim eget posuere.
            </p>
            <p>
              Etiam sit amet purus vel orci cursus convallis sed non augue. Sed
              mattis pretium mollis. Sed quis est non purus porta pretium vel
              non nisl. Nulla euismod fringilla nunc eu semper. Nulla in congue
              arcu, ut lacinia arcu. Etiam ultrices, augue ut semper lacinia,
              tortor nisl tempor nisl, ac feugiat sem dui at neque. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac
              turpis egestas. Integer porta est sed nisl lacinia, id auctor nibh
              tincidunt. Phasellus eget placerat quam. Duis luctus neque vel
              nisi auctor vehicula. Maecenas euismod luctus sapien, vitae
              elementum risus congue quis. Sed laoreet nisi eu dignissim porta.
            </p>
          </div>
          <div>
            <h2>{props.name}</h2>
          </div>
          <div>
            <h3>{props.price}</h3>
          </div>
        </div>
      </div>
      <style jsx>{`
        .shirtCont {
          display: flex;
          padding: 1rem;
          margin: 1rem;
        }
        .imgWrap {
          flex: 1;
          padding: 2rem;
          margin: 2rem;
        }
        .infoCont {
          flex: 2;
          padding: 2rem;
          margin: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .nameWrap {
          color: red;
        }
        .priceWrap {
          color: blue;
        }

        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Post;
