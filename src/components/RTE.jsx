// import React from 'react';
// import { Editor } from "@tinymce/tinymce-react";
// import { Controller } from "react-hook-form";

// export default function RTE({ name, control, label, defaultValue = "" }) {
//     return (
//         <div className='w-full'>
//             {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

//             <Controller
//                 name={name || "content"}
//                 control={control}
//                 render={({ field: { onChange } }) => (
//                     <Editor
//                         apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
//                         initialValue={defaultValue}
//                         init={{
//                             height: 500,
//                             menubar: true,
//                             plugins: [
//                                 "image",
//                                 "advlist",
//                                 "autolink",
//                                 "lists",
//                                 "link",
//                                 "charmap",
//                                 "preview",
//                                 "anchor",
//                                 "searchreplace",
//                                 "visualblocks",
//                                 "code",
//                                 "fullscreen",
//                                 "insertdatetime",
//                                 "media",
//                                 "table",
//                                 "help",
//                                 "wordcount"
//                             ],
//                             toolbar:
//                                 "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",

//                             // Custom image upload handler
//                             images_upload_handler: async (blobInfo, success, failure) => {
//                                 try {
//                                     const formData = new FormData();
//                                     formData.append("file", blobInfo.blob(), blobInfo.filename());

//                                     // Example: Send to your backend
//                                     const res = await fetch("/upload", {
//                                         method: "POST",
//                                         body: formData
//                                     });

//                                     if (!res.ok) throw new Error("Upload failed");

//                                     const data = await res.json();
//                                     success(data.url); // The uploaded image URL
//                                 } catch (err) {
//                                     failure("Image upload failed: " + err.message);
//                                 }
//                             },

//                             content_style:
//                                 "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
//                         }}
//                         onEditorChange={onChange}
//                     />
//                 )}
//             />
//         </div>
//     );
// }



import React from "react";
import { Controller } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";

// CKEditor 5 (single package) – React 19 compatible
// Pick the features you need. You can add/remove later.
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Underline,
  Link,
  List,
  BlockQuote,
  CodeBlock,
  Alignment,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageUpload,
  SimpleUploadAdapter,
} from "ckeditor5";

// CKEditor 5 styles (required)
import "ckeditor5/ckeditor5.css";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <CKEditor
            editor={ClassicEditor}
            /* Initialize with current value (HTML) */
            data={value ?? ""}
            /* Push HTML back into RHF on every change */
            onChange={(_, editor) => onChange(editor.getData())}
            /* Free (GPL) use: set licenseKey to 'GPL' */
            config={{
              licenseKey: "GPL", // or your commercial key if you have one
              // Plugins you want in the editor:
              plugins: [
                Essentials,
                Paragraph,
                Heading,
                Bold,
                Italic,
                Underline,
                Link,
                List,
                BlockQuote,
                CodeBlock,
                Alignment,
                Image,
                ImageToolbar,
                ImageCaption,
                ImageStyle,
                ImageUpload,
                SimpleUploadAdapter, // enables simple XHR uploads
              ],
              // Toolbar layout (similar to TinyMCE basics)
              toolbar: [
                "undo",
                "redo",
                "|",
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "link",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "blockQuote",
                "codeBlock",
                "|",
                "insertImage",
                "|",
                "alignment:left",
                "alignment:center",
                "alignment:right",
                "alignment:justify",
              ],
              // Image toolbar
              image: {
                toolbar: [
                  "imageStyle:inline",
                  "imageStyle:block",
                  "imageStyle:side",
                  "|",
                  "imageTextAlternative",
                ],
              },
              // ✅ Free, no third-party service: upload straight to your backend
              //    Make sure your /upload endpoint responds with JSON:
              //    { "url": "https://your.cdn/path/to/image.jpg" }
              simpleUpload: {
                uploadUrl: "/upload",
                // headers: { Authorization: "Bearer <token>" } // (optional)
              },
            }}
          />
        )}
      />
    </div>
  );
}
