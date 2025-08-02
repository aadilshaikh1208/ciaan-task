import { useState } from 'react';
import { Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/lib/posts';

interface CreatePostProps {
  onPostCreated: (post: any) => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = {
    name: 'John Doe',
    avatar: '/placeholder-avatar.jpg'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      const res = await createPost(content.trim(), token);
      onPostCreated(res.post);
      setContent('');
      setIsFocused(false);
    } catch (err) {
      // Optionally show error
    } finally {
      setIsLoading(false);
    }
  };

  const maxLength = 500;
  const remainingChars = maxLength - content.length;

  return (
    <Card className="animate-bounce-gentle shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-card to-card/95">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <Avatar className="h-12 w-12 flex-shrink-0 hover-scale transition-transform duration-300">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                maxLength={maxLength}
                className={`min-h-[80px] resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 p-0 transition-all duration-500 ${
                  isFocused ? 'min-h-[120px] scale-[1.01]' : ''
                }`}
              />
              {(isFocused || content) && (
                <div className="animate-slide-up-enhanced">
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className={`text-sm ${
                      remainingChars < 50 
                        ? remainingChars < 0 
                          ? 'text-destructive' 
                          : 'text-yellow-600'
                        : 'text-muted-foreground'
                    }`}>
                      {remainingChars} characters remaining
                    </span>
                    <Button
                      type="submit"
                      disabled={!content.trim() || content.length > maxLength || isLoading}
                      className="btn-professional hover:scale-105 transition-transform duration-300"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isLoading ? 'Posting...' : 'Post'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;