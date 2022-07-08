import type { LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { ArrowLeftIcon } from '../../components/ArrowLeftIcon';
import { microcmsClient } from '../../lib/microcms.server';
import type { ArticleResponse } from '../../types';

export const loader: LoaderFunction = async ({ params }) => {
  const article = await microcmsClient.get<ArticleResponse>({
    endpoint: `articles/${params.id}`,
  });
  return article;
};

export default function ArticleDetail() {
  const article = useLoaderData<ArticleResponse>();

  console.log({ article });

  return (
    <div>
      <div className="flex">
        <a href="/" className="flex gap-2 items-center pl-4 pt-4">
          <ArrowLeftIcon />
          <div>back</div>
        </a>
      </div>
      <div className="mt-14">hoge</div>
    </div>
  );
}
