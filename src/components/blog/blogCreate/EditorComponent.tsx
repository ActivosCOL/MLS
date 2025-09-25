// EditorComponent.tsx
'use client';
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EditorComponent = () => {
    const [, setContent] = useState('');

    return (
        <div>
            CKEDITOR
           {/*  <CKEditor
                editor={ClassicEditor}
                data="<p>Escribe tu contenido aquí...</p>"
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setContent(data);
                }}
            /> */}
        </div>
    );
};

export default EditorComponent;
