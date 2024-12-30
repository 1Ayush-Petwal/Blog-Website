import React from 'react'
import { Controller } from 'react-hook-form'
import { Editor } from '@tinymce/tinymce-react'

function RTE({
    name,
    label,
    control,
    defaultValue = "",
}) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>
                {label}
            </label>}

            {/* // Passes the control to somewhere else  */}
            <Controller
                name={name || 'content'}
                control={control}
                // If there is any change in the field then inform using rendering the following Editor or anything else
                render={({ field: { onChange } }) => (
                    <Editor
                        apiKey='emlk06j91kqu7l90yez21h3wkcrv8dg3m3jpi717xvtp6t32'
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
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
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        }

                        }
                        onEditorChange={onChange}
                    //This line is setting a prop called onEditorChange to a function named onChange.
                    // when an event occurs in the editor (such as a change in the text), the onChange function will be called.

                    />
                )}
            />
        </div>
    )
}

export default RTE