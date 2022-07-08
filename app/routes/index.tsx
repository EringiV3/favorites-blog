import type { LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { dayjs } from '../lib/dayjs';
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

  return (
    <div className="container mx-auto px-4">
      <h1 className="flex justify-center font-bold text-3xl mt-24">
        eringiv3 favorites
      </h1>
      <div className="flex justify-center pt-6 ">
        <a
          href="https://twitter.com/Eringi_V3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 no-underline hover:underline"
        >
          @eringiv3
        </a>
        <div className="pl-1">のお気に入りのモノをあつめたサイト</div>
      </div>
      <div className="mt-24 flex flex-col gap-8">
        {articles.map((v) => (
          <div key={v.id} className="flex">
            <div>
              {dayjs.utc(v.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}
            </div>
            <a
              href={`/articles/${v.id}`}
              className="pl-5 text-blue-500 no-underline hover:underline"
            >
              {v.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
