import type { LoaderFunction, MetaFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { SITE_URL } from '../config/constants';
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

export const meta: MetaFunction = ({ data, params, location }) => {
  return {
    title: `eringiv3 favorites`,
    description: 'eringiv3のお気に入りのモノをあつめたサイト',
    'og:url': `${SITE_URL}${location.pathname}`,
    'og:title': `eringiv3 favorites`,
    'og:description': 'eringiv3のお気に入りのモノをあつめたサイト',
    'og:image': `${SITE_URL}/ogp.png`,
    'og:site_name': 'eringiv3 favorites',
    'twitter:card': 'summary_large_image',
    'twitter:creator': '@eringi_v3',
    'twitter:site': '@eringi_v3',
  };
};

export default function Index() {
  const articles = useLoaderData<ArticleResponse[]>();

  return (
    <div className="container mx-auto px-4">
      <h1 className="flex justify-center font-bold text-3xl mt-24">
        eringiv3 favorites
      </h1>
      <div className="flex justify-center pt-10 ">
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
          <div key={v.id} className="flex gap-6">
            <div className="text-gray-500">
              {dayjs.utc(v.publishedAt).tz('Asia/Tokyo').format('YYYY-MM-DD')}
            </div>
            <a
              href={`/articles/${v.id}`}
              className="no-underline hover:underline"
            >
              {v.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
