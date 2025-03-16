import { NewsCardBigProps } from "./NewsCardBig";

export interface SavedArticlesProps {
  articles: NewsCardBigProps[];
}

const SavedArticles = ({ articles }: SavedArticlesProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    </div>
  );
};

export default SavedArticles;
