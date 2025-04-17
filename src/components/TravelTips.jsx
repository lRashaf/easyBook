import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const articles = [
  {
    id: 1,
    title: '10 Tips for Finding the Best Hotel Deals',
    excerpt: 'Learn how to get the most value for your money with these expert booking tips.',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c',
    date: '2024-02-15'
  },
  {
    id: 2,
    title: 'Best Times to Book Your Holiday',
    excerpt: 'Discover the optimal booking windows for different seasons and destinations.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1503221043305-f7498f8b7888',
    date: '2024-02-10'
  },
  {
    id: 3,
    title: 'Must-Have Travel Apps for 2024',
    excerpt: 'Essential mobile apps to make your travel planning and booking easier.',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    date: '2024-02-05'
  }
];

export default function TravelTips() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Travel Tips & Insights</h2>
          <Link to="/blog" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <article key={article.id} className="group">
              <div className="mb-4 overflow-hidden rounded-xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600">
                  {article.excerpt}
                </p>

                <Link
                  to={`/blog/${article.id}`}
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700"
                >
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
