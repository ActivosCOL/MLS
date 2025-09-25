'use client'

import React, { useState } from 'react'
import {
    Typography,
    TextField,
    Select,
    MenuItem,
    Paper,
    Box,
    Chip,
    Button
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloseIcon from '@mui/icons-material/Close'
import EditorComponent from '../blogCreate/EditorComponent'


const categories = ['Tecnología', 'Negocios', 'Salud', 'Viajes']

const EditPostForm = () => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('Tecnología')
    const [, setThumbnail] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

    const [tagInput, setTagInput] = useState('')
    const [tags, setTags] = useState<string[]>([])

    const [editorName, setEditorName] = useState('')
    const [publishDate, setPublishDate] = useState('')

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setThumbnail(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const handleAddTag = () => {
        const trimmed = tagInput.trim()
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed])
            setTagInput('')
        }
    }

    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter(tag => tag !== tagToDelete))
    }

    const handleUpdate = () => {
        const data = {
            titulo: title,
            categoria: category,
            editor: editorName,
            fecha_publicacion: publishDate,
            etiquetas: tags,
            // descripción se toma desde el editor
        }

        console.log('Publicación actualizada:', data)
        alert('Publicación editada (simulada en consola)')
    }

    return (
        <Box
            sx={{
                display: 'flex',
                gap: 3,
                width: '80%',
                mx: 'auto',
                mt: 4,
                py: 10
            }}
        >
            {/* Izquierda - 60% */}
            <Box sx={{ width: '60%' }}>
                <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Editar publicación
                    </Typography>

                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        Imagen destacada
                    </Typography>
                    <Box
                        component="label"
                        htmlFor="upload-thumbnail"
                        sx={{
                            border: '2px dashed #ccc',
                            borderRadius: 2,
                            backgroundColor: '#f4f5f7',
                            height: 150,
                            mb: 3,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            textAlign: 'center',
                            '&:hover': { backgroundColor: '#f0f0f0' }
                        }}
                    >
                        <input
                            id="upload-thumbnail"
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleUpload}
                        />
                        {preview ? (
                            <img
                                src={preview}
                                alt="Vista previa"
                                style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 8 }}
                            />
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <CloudUploadIcon fontSize="large" sx={{ mb: 1, color: '#888' }} />
                                <Typography variant="body2" color="text.secondary">
                                    Subir imagen
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        Título de la publicación
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Escribe el título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        Categoría
                    </Typography>
                    <Select
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        sx={{ mb: 3 }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>

                    <Typography variant="body2" fontWeight={600} sx={{ mt: 3, mb: 1 }}>
                        Nombre del editor
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Nombre del editor"
                        value={editorName}
                        onChange={(e) => setEditorName(e.target.value)}
                        sx={{ mb: 3 }}
                    />

                    <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        Fecha de publicación
                    </Typography>
                    <TextField
                        fullWidth
                        type="date"
                        value={publishDate}
                        onChange={(e) => setPublishDate(e.target.value)}
                        sx={{ mb: 3 }}
                        InputLabelProps={{ shrink: true }}
                    />
                    {/*Descripción de la publicación  */}
                    <EditorComponent />

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 4 }}
                        onClick={handleUpdate}
                    >
                        Actualizar publicación
                    </Button>
                </Paper>
            </Box>

            {/* Derecha - 40% */}
            <Box sx={{ width: '40%' }}>
                <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Etiquetas
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="Escribe una etiqueta"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddTag}
                            disabled={!tagInput.trim()}
                            sx={{ whiteSpace: 'nowrap' }}
                        >
                            Añadir
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {tags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={() => handleDeleteTag(tag)}
                                deleteIcon={<CloseIcon />}
                                sx={{ backgroundColor: '#e0e0e0' }}
                            />
                        ))}
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default EditPostForm
