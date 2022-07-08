import type { LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { getAllContents } from '../lib/microcms.server';
import type { ArticleResponse, ListContentsResponse } from '../types';

type ArticleListResponse = ListContentsResponse<ArticleResponse>;

export const loader: LoaderFunction = async () => {
  const allArticleResponse = await getAllContents<ArticleListResponse>(
    'articles'
  );
  const allArticles = allArticleResponse.flatMap((v) => v.contents);
  return allArticles;
};

export default function Index() {
  const articles = useLoaderData<ArticleResponse[]>();

  console.log({ articles });
  return <div className="container mx-auto px-4">hogee</div>;
}
