import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "blogs"),
        where("authorId", "==", auth.currentUser.uid)
      );

      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBlogs(results);
    };

    fetchMyBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>

      {blogs.length === 0 && <p>You haven’t written anything yet.</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-700 mt-2 line-clamp-3">
              {blog.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
