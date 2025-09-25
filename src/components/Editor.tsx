"use client";
import React from 'react';
import { Puck } from '@measured/puck';

interface EditorProps {
    value: string;
    onChange: (content: string) => void;
}

// Configuración mínima de Puck para un editor de contenido rico
const puckConfig = {
    components: {
        paragraph: {
            render: ({ children }: any) => <p>{children}</p>,
            fields: {},
        },
        heading: {
            render: ({ children, level = 2 }: any) => {
                const safeLevel = Math.min(Math.max(level, 1), 6);
                const Tag = `h${safeLevel}`;
                return React.createElement(Tag, null, children);
            },
            fields: {
                level: { type: 'number', label: 'Nivel', defaultValue: 2 },
            },
        },
        text: {
            render: ({ text }: any) => <span>{text}</span>,
            fields: {
                text: { type: 'text', label: 'Texto' },
            },
        },
        image: {
            render: ({ src }: any) => <img src={src} alt="" style={{ maxWidth: '100%' }} />,
            fields: {
                src: { type: 'text', label: 'URL de la imagen' },
            },
        },
        link: {
            render: ({ href, children }: any) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
            fields: {
                href: { type: 'text', label: 'URL' },
            },
        },
        button: {
            render: ({ label, href }: any) => (
                <a href={href} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 16px', background: '#1A3355', color: '#fff', borderRadius: 4, textDecoration: 'none', display: 'inline-block' }}>{label}</a>
            ),
            fields: {
                label: { type: 'text', label: 'Texto del botón' },
                href: { type: 'text', label: 'URL' },
            },
        },
        card: {
            render: ({ children }: any) => (
                <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, margin: 8, background: '#fafbfc' }}>{children}</div>
            ),
            fields: {},
        },
        flex: {
            render: ({ children }: any) => (
                <div style={{ display: 'flex', gap: 16 }}>{children}</div>
            ),
            fields: {},
        },
        grid: {
            render: ({ children, columns = 2 }: any) => (
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 16 }}>{children}</div>
            ),
            fields: {
                columns: { type: 'number', label: 'Columnas', defaultValue: 2 },
            },
        },
    },
};

const defaultValue: any[] = [];

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    // Puck espera un objeto, así que usamos JSON para serializar/deserializar el contenido
    let parsedValue: any;
    try {
        parsedValue = value ? JSON.parse(value) : defaultValue;
    } catch {
        parsedValue = defaultValue;
    }

    // Cuando cambia el contenido en Puck, lo serializamos a string para mantener la interfaz
    const handleChange = (content: any) => {
        onChange(JSON.stringify(content));
    };

return (
  <div
    style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      minHeight: 200,
      padding: 12,
      maxHeight: 400, // ← límite de altura
      overflowY: 'auto' // ← scroll interno
    }}
  >
    <Puck
      config={puckConfig as any}
      data={{ content: parsedValue }}
      onChange={(newData) => handleChange(newData.content)}
    />
  </div>
    );
};

export default Editor;
