import { getCurrentUser } from "@/lib/session";
import { db } from "@/lib/db";

import PostItem from "@/components/post-item";
import DashboardHeader from "@/components/dashboard-header";
import DashboardShell from "@/components/shell";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

const page = async ({}) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const posts = await db.post.findMany({
    where: {
      collaborators: {
        some: {
          userId: user.id,
        },
      },
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
      collaborators: {
        where: {
          userId: user!.id,
        },
        select: {
          userId: true,
          permissions: true,
        },
      },
    },
  });

  return (
    <DashboardShell>
      <DashboardHeader
        titleTPath="profile.collaboration.header.title"
        subtitleTPath="profile.collaboration.header.subtitle"
      ></DashboardHeader>
      <div className="w-full">
        {posts.map((post) => (
          <PostItem
            key={post.id}
            post={{
              id: post.id,
              title: post.title,
              updatedAt: post.updatedAt,
              published: post.published,
              authorName: post.author.name,
              permissions: post.collaborators[0].permissions,
            }}
          />
        ))}
      </div>
    </DashboardShell>
  );
};

export default page;
