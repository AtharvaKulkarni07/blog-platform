import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    await addDoc(collection(db, "blogs"), {
      title,
      content,
      authorId: auth.currentUser.uid,
      authorEmail: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold mb-4">Write a Blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog title"
          className="w-full border p-2 mb-4"
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your content..."
          className="w-full border p-2 mb-4 h-40"
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Publish
        </button>
      </form>
    </div>
  );
}
