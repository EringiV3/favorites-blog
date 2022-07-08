import type { MicroCMSImage } from 'microcms-js-sdk';

export type ListContentPaginationInfo = {
  totalCount: number;
  offset: number;
  limit: number;
};
export type ListContentsResponse<T> = {
  contents: T[];
} & ListContentPaginationInfo;

export type ContentResponse<T> = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
} & T;

export type ArticleResponse = ContentResponse<{
  title: string;
  content: string;
  pictures: Pictures[];
  linkUrl?: string;
  linkText?: string;
}>;

export type Pictures = {
  fieldId: string;
  picture: MicroCMSImage;
};
