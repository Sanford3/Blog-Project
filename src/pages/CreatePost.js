// export default fuction CreatePost(){
//     return (
//         <div>here you create your new post</div>
//     )
// }

import React, { useState } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
//import { useState } from 'react';

const modules = {
         
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
}

const formats = [
'header',
'bold', 'italic', 'underline', 'strike', 'blockquote',
'list', 'bullet', 'indent',
'link', 'image'
];

function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    async function CreateNewPost(ev){
        const data = new FormData();
        data.set('Title', title);
        data.set('Content', content);
        data.set('summary', summary);
        data.set('file')
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body:data
        });
        console.log(await response.json());
    }

  return (
    <form onSubmit={CreateNewPost}>
        <input type="text" placeholder='Title' value={title} onChange={ev=>setTitle(ev.target.value)} style={{width:'90%', height:'40px', border:'1px solid black', borderRadius:'4px', marginLeft:'10px'}}/>
        <input type="text" placeholder='Summary' value={summary} onChange={ev=>setSummary(ev.target.value)} style={{width:'90%', height:'40px', border:'1px solid black', borderRadius:'4px', marginLeft:'10px', marginTop:'5px'}}/>
        <input type="file" name="file" id="a" value={files} onChange={ev=>setFiles(ev.target.files)} style={{marginTop:'10px'}}/>
        <ReactQuill value="{content}" modules={modules} onChange={newValue=>setContent(newValue)} formats={formats} style={{marginTop:'10px', width:'90%', marginLeft:'10px'}}/>

        <button style={{marginTop:'5px', height:'30px', width:'90px',border:'2px solid black', borderRadius:'4px', marginLeft:'10px', backgroundColor:'white'}}>Create Post</button>
    </form>
  );
}

export default CreatePost
