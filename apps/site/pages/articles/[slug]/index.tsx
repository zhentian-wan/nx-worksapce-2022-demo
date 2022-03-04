import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps } from 'next';
import { join } from 'path';
import { ParsedUrlQuery } from 'querystring';
import { getParsedFileContentBySlug, renderMarkdown } from '@ztwdev/markdown';
import { CustomLink } from '@ztwdev/shared/mdx-element';
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';

export interface ArticleProps extends ParsedUrlQuery {
  slug: string;
}

const POSTS_PATH = join(process.cwd(), '_articles');

/**
 * When dealing with Dynamic import libs
 * You need to conside the size of lib iteself.
 * You can further split the details path for each components in tsconifg
  "@ztwdev/shared/mdx-element": ["libs/shared/mdx-element/src/index.ts"],
  "@ztwdev/shared/mdx-element/*": ["libs/shared/mdx-element/src/lib/*"]
 */
const mdxElement = {
  Youtube: dynamic(async () => {
    return await import('@ztwdev/shared/mdx-element/youtube/youtube');
  }),
  a: CustomLink,
};

export function Article({ frontMatter, html }) {
  return (
    <div className="m-6">
      <article className="prose prose-lg">
        <h1>{frontMatter.title}</h1>
        <div>by {frontMatter.author.name}</div>
      </article>
      <hr />
      <MDXRemote {...html} components={mdxElement} />
    </div>
  );
}
export const getStaticProps: GetStaticProps<ArticleProps> = async ({
  params,
}: {
  params: ArticleProps;
}) => {
  // 1. parse the content of our markdown and separate it into frontmatter and content
  const articleMarkdownContent = getParsedFileContentBySlug(
    params.slug,
    POSTS_PATH
  );

  // 2. convert markdown content => HTML
  const renderHTML = await renderMarkdown(articleMarkdownContent.content);

  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderHTML,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  const paths = readdirSync(POSTS_PATH)
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};

export default Article;
