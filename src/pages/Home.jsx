import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(results);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Latest Blogs</h1>

      {blogs.length === 0 && <p>No blogs yet.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-600 text-sm mb-2">
              By {blog.authorEmail}
            </p>
            <p className="text-gray-800 line-clamp-3">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
