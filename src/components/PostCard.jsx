import React from 'react';
import { Link } from 'react-router-dom';
import appwriteservice from '../appwrite/conf';
import { useSelector } from 'react-redux'; // or your context

function PostCard({ $id, title, featuredImage, userId, onDelete }) {
  const userData = useSelector((state) => state.auth.userData); // or your global context

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        await appwriteservice.deletePost($id);
        if (onDelete) {
          onDelete($id); // callback to refresh list
        }
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete post');
      }
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-xl p-3">
      <Link to={`/post/${$id}`}>
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteservice.getFileView(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </Link>

      {/* Show edit/delete only to post owner */}
      {userData?.$id === userId && (
        <div className="flex gap-2 mt-2">
          <Link
            to={`/edit-post/${$id}`}
            className="text-blue-500 text-sm hover:underline"
          >
            ✏️ Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 text-sm hover:underline"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostCard;
