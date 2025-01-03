import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IssueCard } from "@/components/IssueCard";
import { IssueDialog } from "@/components/IssueDialog";
import { Skeleton } from "@/components/ui/skeleton";

const GITHUB_API = "https://api.github.com/search/issues";

interface GitHubIssue {
  title: string;
  number: number;
  state: string;
  created_at: string;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
  comments: number;
  body: string;
  html_url: string;
}

const Index = () => {
  const [selectedIssue, setSelectedIssue] = useState<GitHubIssue | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["github-issues"],
    queryFn: async () => {
      const response = await fetch(
        `${GITHUB_API}?q=dog+in:title,body+is:issue&sort=updated&order=desc`
      );
      const data = await response.json();
      return data.items as GitHubIssue[];
    },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl fade-in">
      <div className="space-y-3 mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">GitHub Dog Issues</h1>
        <p className="text-lg text-muted-foreground">
          Discover the latest GitHub issues mentioning dogs
        </p>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-[140px] w-full rounded-lg" />
            </div>
          ))
        ) : (
          data?.map((issue) => (
            <IssueCard
              key={issue.number}
              issue={issue}
              onClick={() => setSelectedIssue(issue)}
            />
          ))
        )}
      </div>

      <IssueDialog
        issue={selectedIssue}
        open={!!selectedIssue}
        onOpenChange={(open) => !open && setSelectedIssue(null)}
      />
    </div>
  );
};

export default Index;