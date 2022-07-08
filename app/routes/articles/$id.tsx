import type { LoaderFunction } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowLeftIcon } from '../../components/ArrowLeftIcon';
import { LinkIcon } from '../../components/LinkIcon';
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
      <article className="mt-14 px-4 flex flex-col gap-8">
        <div>
          <Swiper
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={true}
            modules={[Pagination]}
          >
            {article.pictures.map((v) => (
              <SwiperSlide
                key={v.picture.url}
                className="flex justify-center items-center"
              >
                <picture className="overflow-hidden rounded-full">
                  <source
                    srcSet={`${v.picture.url}?fit=crop&w=500&h=500`}
                    media="(min-width: 768px)"
                  />
                  <img src={`${v.picture.url}?fit=crop&w=400&h=400`} alt="" />
                </picture>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-4 md:mx-14">
          <h1 className="font-bold text-2xl">{article.title}</h1>
          <div
            className="mt-8 prose"
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          ></div>
          {article.linkUrl && (
            <div className="mt-8 flex gap-2 items-center">
              <LinkIcon />
              <a
                href={article.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 no-underline hover:underline"
              >
                {article.linkText ? article.linkText : article.linkUrl}
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
