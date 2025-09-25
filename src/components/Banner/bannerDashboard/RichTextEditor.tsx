'use client';
import { Editor } from '@tiptap/react';
import { Box, IconButton, Tooltip } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

interface ToolbarProps {
    editor: Editor | null;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
    if (!editor) return null;

    return (
        <Box display="flex" gap={1} borderBottom="1px solid #ccc" pb={1} mb={2} py={10}>
            <Tooltip title="Negrita">
                <IconButton onClick={() => editor.chain().focus().toggleMark('bold').run()}>
                    <FormatBoldIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Cursiva">
                <IconButton onClick={() => editor.chain().focus().toggleMark('italic').run()}>
                    <FormatItalicIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Subrayado">
                <IconButton onClick={() => editor.chain().focus().toggleMark('underline').run()}>
                    <FormatUnderlinedIcon />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default Toolbar;
