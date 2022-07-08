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
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to eringiv3 favorites!</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
