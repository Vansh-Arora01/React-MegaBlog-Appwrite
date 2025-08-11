import React from 'react';
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                        initialValue={defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "help",
                                "wordcount"
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",

                            // Custom image upload handler
                            images_upload_handler: async (blobInfo, success, failure) => {
                                try {
                                    const formData = new FormData();
                                    formData.append("file", blobInfo.blob(), blobInfo.filename());

                                    // Example: Send to your backend
                                    const res = await fetch("/upload", {
                                        method: "POST",
                                        body: formData
                                    });

                                    if (!res.ok) throw new Error("Upload failed");

                                    const data = await res.json();
                                    success(data.url); // The uploaded image URL
                                } catch (err) {
                                    failure("Image upload failed: " + err.message);
                                }
                            },

                            content_style:
                                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}
