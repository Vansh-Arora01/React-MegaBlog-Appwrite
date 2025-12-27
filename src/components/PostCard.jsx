// import React from 'react';
// import { Link } from 'react-router-dom';
// import appwriteservice from '../appwrite/conf';
// import { useSelector } from 'react-redux'; // or your context

// function PostCard({ $id, title, featuredImage, userId, onDelete }) {
//   const userData = useSelector((state) => state.auth.userData); // or your global context

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this post?');
//     if (confirmDelete) {
//       try {
//         await appwriteservice.deletePost($id);
//         if (onDelete) {
//           onDelete($id); // callback to refresh list
//         }
//       } catch (error) {
//         console.error('Delete failed:', error);
//         alert('Failed to delete post');
//       }
//     }
//   };

//   return (
//     <div className="w-full bg-gray-100 rounded-xl p-3">
//       <Link to={`/post/${$id}`}>
//         <div className="w-full justify-center mb-4">
//           <img
//             src={appwriteservice.getFileView(featuredImage)}
//             alt={title}
//             className="rounded-xl"
//           />
//         </div>
//         <h2 className="text-xl font-bold">{title}</h2>
//       </Link>

//       {/* Show edit/delete only to post owner */}
//       {userData?.$id === userId && (
//         <div className="flex gap-2 mt-2">
//           <Link
//             to={`/edit-post/${$id}`}
//             className="text-blue-500 text-sm hover:underline"
//           >
//             ✏️ Edit
//           </Link>
//           <button
//             onClick={handleDelete}
//             className="text-red-500 text-sm hover:underline"
//           >
//             🗑️ Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PostCard;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import appwriteservice from '../appwrite/conf';
// import { useSelector } from 'react-redux';

// function PostCard({ $id, title, featuredImage, userId, onDelete }) {
//   const userData = useSelector((state) => state.auth.userData);

//   const handleDelete = async () => {
//     const confirmDelete = window.confirm('Are you sure you want to delete this post?');
//     if (confirmDelete) {
//       try {
//         await appwriteservice.deletePost($id);
//         if (onDelete) onDelete($id);
//       } catch (error) {
//         console.error('Delete failed:', error);
//         alert('Failed to delete post');
//       }
//     }
//   };

//   return (
//     <div
//       className="
//         group relative w-full
//         rounded-2xl overflow-hidden
//         bg-white
//         border border-gray-100
//         shadow-md hover:shadow-2xl
//         transition-all duration-300
//         hover:-translate-y-1
//       "
//     >
//       {/* Image */}
//       <Link to={`/post/${$id}`}>
//         <div className="relative aspect-[16/9] overflow-hidden">
//           <img
//             src={appwriteservice.getFileView(featuredImage)}
//             alt={title}
//             className="
//               h-full w-full object-cover
//               transition-transform duration-500
//               group-hover:scale-105
//             "
//           />

//           {/* Gradient overlay */}
//           <div className="
//             absolute inset-0
//             bg-gradient-to-t from-black/40 via-black/10 to-transparent
//             opacity-0 group-hover:opacity-100
//             transition-opacity duration-300
//           " />
//         </div>
//       </Link>

//       {/* Content */}
//       <div className="p-4">
//         <Link to={`/post/${$id}`}>
//           <h2
//             className="
//               text-lg font-bold text-gray-900
//               line-clamp-2
//               group-hover:text-indigo-600
//               transition-colors duration-200
//             "
//           >
//             {title}
//           </h2>
//         </Link>

//         {/* Owner Actions */}
//         {userData?.$id === userId && (
//           <div className="mt-4 flex gap-2">
//             <Link
//               to={`/edit-post/${$id}`}
//               className="
//                 px-3 py-1 text-xs font-medium
//                 rounded-full
//                 bg-indigo-50 text-indigo-600
//                 hover:bg-indigo-100
//                 transition
//               "
//             >
//               ✏️ Edit
//             </Link>
//             <button
//               onClick={handleDelete}
//               className="
//                 px-3 py-1 text-xs font-medium
//                 rounded-full
//                 bg-red-50 text-red-600
//                 hover:bg-red-100
//                 transition
//               "
//             >
//               🗑️ Delete
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Accent border */}
//       <div className="
//         absolute inset-x-0 bottom-0 h-1
//         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
//         opacity-0 group-hover:opacity-100
//         transition-opacity duration-300
//       " />
//     </div>
//   );
// }

// export default PostCard;



import React from 'react';
import { Link } from 'react-router-dom';
import appwriteservice from '../appwrite/conf';
import { useSelector } from 'react-redux';

function PostCard({ $id, title, featuredImage, userId, onDelete }) {
  const userData = useSelector((state) => state.auth.userData);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await appwriteservice.deletePost($id);
      onDelete?.($id);
    } catch (error) {
      console.error(error);
      alert('Failed to delete post');
    }
  };

  const hasImage = Boolean(featuredImage);

  return (
    <div
      className="
        group relative w-full
    rounded-2xl overflow-hidden
    bg-white
    border border-gray-100
    shadow-sm hover:shadow-lg
    transition-all duration-300
    hover:-translate-y-0.5
      "
    >
      {/* Media Section */}
      <Link to={`/post/${$id}`}>
        <div className="relative aspect-[16/9] overflow-hidden">

          {hasImage ? (
            <img
              src={appwriteservice.getFileView(featuredImage)}
              alt={title}
              className="
                 h-full w-full
    object-cover object-center
    transition-transform duration-500
    group-hover:scale-[1.02]
              "
            />
          ) : (
            // 🔥 Placeholder (VERY IMPORTANT)
            <div className="
              h-full w-full
              flex items-center justify-center
              bg-gradient-to-br from-indigo-500 to-purple-600
            ">
              <span className="text-4xl font-bold text-white opacity-90">
                {title?.charAt(0)?.toUpperCase()}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-black/40 via-black/10 to-transparent
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          " />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/post/${$id}`}>
          <h2
            className="
              text-lg font-semibold text-gray-900
              line-clamp-2
              group-hover:text-indigo-600
              transition-colors duration-200
            "
          >
            {title}
          </h2>
        </Link>

        {/* Owner Actions (Hover Only) */}
        {userData?.$id === userId && (
          <div className="
           mt-4 flex gap-2
    opacity-100
    lg:opacity-0 lg:group-hover:opacity-100
    transition-opacity duration-200
          ">
            <Link
              to={`/edit-post/${$id}`}
              className="
                px-3 py-1 text-xs font-medium
                rounded-full
                bg-indigo-50 text-indigo-600
                hover:bg-indigo-100
              "
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="
                px-3 py-1 text-xs font-medium
                rounded-full
                bg-red-50 text-red-600
                hover:bg-red-100
              "
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Accent Bar */}
      <div className="
        absolute inset-x-0 bottom-0 h-1
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      " />
    </div>
  );
}

export default PostCard;
