import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';

import BlogHero from '@/components/BlogHero';
import CodeSnippet from '@/components/CodeSnippet/CodeSnippet';
import { loadBlogPost } from '@/helpers/file-helpers';

const DivisionGroupsDemo = dynamic(() => import('@/components/DivisionGroupsDemo'));
const CircularColorsDemo = dynamic(() => import('@/components/CircularColorsDemo'));

import styles from './postSlug.module.css';

export async function generateMetadata({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);
  return {
    title: blogPost.frontmatter.title,
    description: blogPost.frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const blogPost = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={blogPost.frontmatter.title} publishedOn={blogPost.frontmatter.publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          frontmatter={blogPost.frontmatter}
          source={blogPost.content}
          components={{ pre: CodeSnippet, DivisionGroupsDemo, CircularColorsDemo }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
