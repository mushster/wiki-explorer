'use client'

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ArticleProps {
  title: string;
  html: string;
  category: string;
  length: number;
}

const Article = ({ article }: { article: ArticleProps }) => {
  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {article.title}
        </CardTitle>
        <div className="text-sm text-gray-500">
          Category: {article.category} • Length: {article.length.toLocaleString()} characters
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: article.html }} 
        />
      </CardContent>
    </Card>
  );
};

export default Article; 