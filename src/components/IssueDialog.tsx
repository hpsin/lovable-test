import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Clock, GitPullRequest, MessageCircle } from "lucide-react";

interface IssueDialogProps {
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
    body: string;
    html_url: string;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IssueDialog({ issue, open, onOpenChange }: IssueDialogProps) {
  if (!issue) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
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
          <DialogTitle className="text-xl">{issue.title}</DialogTitle>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
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
        </DialogHeader>
        <div className="mt-4 prose prose-sm max-w-none">
          <div className="whitespace-pre-wrap">{issue.body}</div>
        </div>
        <div className="mt-4">
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}