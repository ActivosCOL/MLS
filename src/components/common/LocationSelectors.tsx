import React, { useMemo, memo } from 'react';
import { 
    Box, 
    Typography, 
    TextField, 
    Chip, 
    Autocomplete,
    Checkbox
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { colombia } from '@/utils/colombia/colombia';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface LocationSelectorsProps {
    selectedDepartments: string[];
    selectedCities: string[];
    onDepartmentChange: (value: string[]) => void;
    onCityChange: (value: string[]) => void;
}

const DepartmentSelector = memo(({ selectedDepartments, onChange }: {
    selectedDepartments: string[];
    onChange: (value: string[]) => void;
}) => {
    const departments = useMemo(() => colombia.map(dep => dep.departamento), []);
    
    const filterOptions = useMemo(() => {
        return (options: string[], { inputValue }: { inputValue: string }) => {
            const searchTerm = inputValue.toLowerCase();
            return options.filter(option => 
                option.toLowerCase().includes(searchTerm)
            );
        };
    }, []);

    return (
        <Autocomplete
            multiple
            options={departments}
            value={selectedDepartments}
            onChange={(_, newValue) => {
                onChange(newValue);
            }}
            disableCloseOnSelect
            filterOptions={filterOptions}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Buscar departamento..."
                    size="small"
                />
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                        size="small"
                        sx={{ 
                            height: '24px',
                            '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.75rem'
                            }
                        }}
                    />
                ))
            }
            sx={{
                '& .MuiOutlinedInput-root': {
                    minHeight: '40px',
                    maxHeight: '80px',
                    overflow: 'auto',
                    '& .MuiAutocomplete-input': {
                        padding: '8px 14px'
                    }
                }
            }}
        />
    );
});

DepartmentSelector.displayName = 'DepartmentSelector';

const CitySelector = memo(({ selectedDepartments, selectedCities, onChange }: {
    selectedDepartments: string[];
    selectedCities: string[];
    onChange: (value: string[]) => void;
}) => {
    const availableCities = useMemo(() => {
        return colombia
            .filter((dep) => selectedDepartments.includes(dep.departamento))
            .flatMap((dep) => dep.ciudades);
    }, [selectedDepartments]);

    const filterOptions = useMemo(() => {
        return (options: string[], { inputValue }: { inputValue: string }) => {
            const searchTerm = inputValue.toLowerCase();
            return options.filter(option => 
                option.toLowerCase().includes(searchTerm)
            );
        };
    }, []);

    return (
        <Autocomplete
            multiple
            options={availableCities}
            value={selectedCities}
            onChange={(_, newValue) => {
                onChange(newValue);
            }}
            disableCloseOnSelect
            disabled={selectedDepartments.length === 0}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                    <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option}
                </li>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Buscar ciudad..."
                    size="small"
                />
            )}
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                        size="small"
                        sx={{ 
                            height: '24px',
                            '& .MuiChip-label': {
                                px: 1,
                                fontSize: '0.75rem'
                            }
                        }}
                    />
                ))
            }
            sx={{
                '& .MuiOutlinedInput-root': {
                    minHeight: '40px',
                    maxHeight: '80px',
                    overflow: 'auto',
                    '& .MuiAutocomplete-input': {
                        padding: '8px 14px'
                    }
                }
            }}
        />
    );
});

CitySelector.displayName = 'CitySelector';

const LocationSelectors: React.FC<LocationSelectorsProps> = ({
    selectedDepartments,
    selectedCities,
    onDepartmentChange,
    onCityChange,
}) => {
    return (
        <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 2 }
        }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                    Departamento de operación principal
                </Typography>
                <DepartmentSelector 
                    selectedDepartments={selectedDepartments}
                    onChange={onDepartmentChange}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
                    Ciudad de operación principal
                </Typography>
                <CitySelector 
                    selectedDepartments={selectedDepartments}
                    selectedCities={selectedCities}
                    onChange={onCityChange}
                />
            </Box>
        </Box>
    );
};

export default memo(LocationSelectors); 