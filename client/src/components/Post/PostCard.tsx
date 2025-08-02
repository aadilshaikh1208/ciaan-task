import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PostCardProps {
  post: {
    id?: string;
    _id?: string;
    author: {
      fullName: string;
      avatar?: string;
      title?: string;
      email?: string;
      _id?: string;
    };
    content: string;
    createdAt?: string; // timestamp from backend
  };
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="post-card animate-fade-in-enhanced group bg-gradient-to-br from-card to-card/90 hover:from-card hover:to-card/95">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 hover-scale transition-transform duration-300">
              <AvatarImage src={post.author.avatar} alt={post.author.fullName} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {post.author.fullName
                  ? post.author.fullName.split(' ').map(n => n[0]).join('')
                  : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground leading-none">
                {post.author.fullName}
              </h3>
              {post.author.title && (
                <p className="text-sm text-muted-foreground mt-1">
                  {post.author.title}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {post.createdAt ? new Date(post.createdAt).toLocaleString() : ''}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:rotate-180 transition-transform duration-300 hover:bg-accent/50">
                <span className="sr-only">More</span>
                {/* You can use an icon here if needed */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap">
          {post.content}
        </p>
      </CardContent>
    </Card>
  );
};

export default PostCard;