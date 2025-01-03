import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Clock, GitPullRequest, MessageCircle } from "lucide-react";

interface IssueCardProps {
  issue: {
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
  };
  onClick: () => void;
}

export function IssueCard({ issue, onClick }: IssueCardProps) {
  return (
    <Card 
      onClick={onClick}
      className="hover:shadow-lg transition-all duration-300 cursor-pointer slide-up"
    >
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={issue.state === "open" ? "default" : "secondary"} className="capitalize">
              {issue.state}
            </Badge>
            {issue.labels.map((label) => (
              <Badge
                key={label.name}
                style={{
                  backgroundColor: `#${label.color}`,
                  color: parseInt(label.color, 16) > 0x7fffff ? "black" : "white",
                }}
                className="capitalize"
              >
                {label.name}
              </Badge>
            ))}
          </div>
          <h3 className="text-lg font-semibold leading-tight hover:text-primary transition-colors">
            {issue.title}
          </h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>
              {formatDistanceToNow(new Date(issue.created_at), { addSuffix: true })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <GitPullRequest className="h-4 w-4" />
            <span>#{issue.number}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <span>{issue.comments}</span>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <img
              src={issue.user.avatar_url}
              alt={issue.user.login}
              className="h-6 w-6 rounded-full"
            />
            <span>{issue.user.login}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}