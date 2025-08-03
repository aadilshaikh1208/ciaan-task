import { useEffect, useState } from 'react';
import { Edit, Mail, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import PostCard from '@/components/Post/PostCard';
import AnimatedPage from '@/components/ui/AnimatedPage';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getProfile } from '@/lib/user';
import { getPosts, Post } from '@/lib/posts';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const profileRes = await getProfile(token);
        setUser(profileRes.user);

        const postsRes = await getPosts();
        const posts = postsRes.posts.filter(
          (post) => post.author._id === profileRes.user._id
        );
        setUserPosts(posts);
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-muted-foreground">Loading profile...</div>
        </div>
      </AnimatedPage>
    );
  }

  if (!user) {
    return (
      <AnimatedPage>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-destructive">User not found or not logged in.</div>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <ScrollReveal direction="up" delay={100}>
            <Card className="animate-fade-in-enhanced mb-8 hover:shadow-xl transition-shadow duration-500 bg-gradient-to-br from-card to-card/95">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg hover-scale transition-transform duration-500">
                      <AvatarImage src={user.avatar || '/placeholder-avatar.jpg'} alt={user.fullName} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                        {user.fullName.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground">{user.fullName}</h1>
                      {/* Optionally show title/company if available */}
                      {user.title && (
                        <p className="text-xl text-muted-foreground mt-1">
                          {user.title} {user.company && `at ${user.company}`}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{user.email}</span>
                      </div>
                      {user.location && (
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{user.location}</span>
                        </div>
                      )}
                      {user.joinDate && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">Joined {user.joinDate}</span>
                        </div>
                      )}
                      {user.website && (
                        <div className="flex items-center space-x-2">
                          <LinkIcon className="h-4 w-4" />
                          <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:text-primary-hover transition-colors duration-200">
                            {user.website.replace('https://', '')}
                          </a>
                        </div>
                      )}
                    </div>

                    {user.bio && (
                      <p className="text-foreground leading-relaxed max-w-2xl">
                        {user.bio}
                      </p>
                    )}

                    {/* Stats */}
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{userPosts.length}</div>
                        <div className="text-sm text-muted-foreground">Posts</div>
                      </div>
                      {/* Add followers/following if available */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Posts Feed */}
          <div className="md:col-span-2 space-y-6">
            <ScrollReveal direction="right" delay={200}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Recent Posts</h2>
                <Badge variant="outline" className="hover:scale-110 transition-transform duration-300">{userPosts.length} posts</Badge>
              </div>
            </ScrollReveal>
            
            {userPosts.map((post, index) => (
              <ScrollReveal 
                key={post._id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={300 + (index * 100)}
              >
                <PostCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Profile;