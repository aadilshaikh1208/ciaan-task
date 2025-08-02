import { useState, useEffect } from 'react';
import CreatePost from '@/components/Post/CreatePost';
import PostCard from '@/components/Post/PostCard';
import AnimatedPage from '@/components/UI/AnimatedPage';
import ScrollReveal from '@/components/UI/ScrollReveal';
import { getPosts, Post } from '@/lib/posts';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getPosts();
        setPosts(res.posts);
      } catch (err) {
        // Optionally show error
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handlePostCreated = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Create Post Section */}
          <ScrollReveal direction="up" delay={100}>
            <div className="mb-8">
              <CreatePost onPostCreated={handlePostCreated} />
            </div>
          </ScrollReveal>

          {/* Posts Feed */}
          <div className="space-y-6">
            {loading ? (
              <div className="text-center py-8">Loading posts...</div>
            ) : (
              posts.map((post, index) => (
                <ScrollReveal 
                  key={post._id}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={200 + (index * 100)}
                >
                  <PostCard post={post} />
                </ScrollReveal>
              ))
            )}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Home;