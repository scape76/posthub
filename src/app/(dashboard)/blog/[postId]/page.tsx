import { FC } from "react";
import type { Post } from "@prisma/client";
import { db } from "@/lib/db";
import { Content } from "@/types/content.d";

import PostEditor from "@/components/editor";
import { notFound } from "next/navigation";

interface pageProps {
  params: {
    postId: Post["id"];
  };
}

async function getPostData(id: Post["id"]) {
  const post = await db.post.findFirst({
    where: {
      id,
    },
  });

  // const data = Object.assign(new Content(), post?.content);
  // const postData = { title: post?.title, data };

  return post;
}

const page = async ({ params }: pageProps) => {
  const post = await getPostData(params.postId);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      {/* <h1 className="text-5xl font-bold focus:outline-none text-[#44403c]">
        {post.title}
      </h1> */}
      <div className="mt-4">
        <PostEditor
          post={{
            id: post.id,
            title: post.title,
            content: post.content,
            published: post.published,
          }}
          readOnly={true}
        />
        {/* {postData.data.blocks?.length ? (
          postData.data.blocks?.map((block) => (
            <BlockItem key={block.id} block={block} />
          ))
        ) : (
          <p className="text-lg">Nothing to show here...</p>
        )} */}
      </div>
    </div>
  );
};

export default page;
