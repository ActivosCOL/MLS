declare module '@/components/Editor' {
    interface EditorProps {
        value: string;
        onChange: (content: string) => void;
    }
    const Editor: React.FC<EditorProps>;
    export default Editor;
} 