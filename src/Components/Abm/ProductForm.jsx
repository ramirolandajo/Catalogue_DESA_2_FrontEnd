import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands, getCategories } from "../../Store/abm/abmSlice";
import CategoryModal from "./CategoryModal";
import ImageEditModal from "./ImageEditModal";
import CsvUploadButton from "./CSVUpload";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, TextareaAutosize, Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


const initialFormState = {
    productCode: "",
    name: "",
    description: "",
    price: "",
    unitPrice: 0,
    discount: "",
    stock: "",
    calification: 0,
    categories: [],
    brand: "",
    images: [],
    hero: false,
    active: true,
    new: false,
    bestSeller: false,
    featured: false,
};

export default function ProductForm({ onSave, editingProduct, onCancel }) {
    const [form, setForm] = useState(initialFormState);
    const [showCategories, setShowCategories] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.abm.categories);
    const brands = useSelector((state) => state.abm.brands);

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getBrands());
    }, [dispatch]);

    useEffect(() => {
        if (editingProduct) {
            console.log(editingProduct)
            let normalizedImages = [];
            if (Array.isArray(editingProduct.images)) {
                normalizedImages = editingProduct.images.flatMap(img => {
                    try {
                        const parsed = JSON.parse(img);
                        return Array.isArray(parsed) ? parsed : [img];
                    } catch {
                        return [img];
                    }
                });
            }

            setForm({
                productCode: editingProduct.productCode || "",
                name: editingProduct.name || "",
                description: editingProduct.description || "",
                price: editingProduct.price || "",
                unitPrice: editingProduct.unitPrice || 0,
                discount: editingProduct.discount || "",
                stock: editingProduct.stock || "",
                calification: editingProduct.calification || 0,
                categories: editingProduct.categories || [],
                brand: editingProduct.brand || null,
                images: normalizedImages,
                hero: editingProduct.hero || false,
                active: editingProduct.active ?? true,
                new: editingProduct.new || false,
                bestSeller: editingProduct.bestSeller || false,
                featured: editingProduct.featured || false,
            });
        } else {
            setForm(initialFormState);
        }
    }, [editingProduct]);

    useEffect(() => {
        const unitPrice = parseFloat(form.unitPrice) || 0;
        const discount = parseFloat(form.discount) || 0;
        const price = unitPrice - unitPrice * (discount / 100);
        setForm((prev) => ({ ...prev, price: price.toFixed(2) }));
    }, [form.unitPrice, form.discount]);

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave({
            productCode: parseInt(form.productCode),
            name: form.name,
            description: form.description,
            unitPrice: parseFloat(form.unitPrice),
            price: parseFloat(form.price),
            discount: parseFloat(form.discount),
            stock: parseInt(form.stock),
            categoryCodes: form.categories.map(c => c.id),
            categories: form.categories.map(c => c.id),
            brandCode: form.brand.id,
            brand: form.brand.id,
            calification: parseFloat(form.calification),
            images: form.images,
            new: form.new,
            bestSeller: form.bestSeller,
            featured: form.featured,
            hero: form.hero,
            active: form.active
        });

        setForm(initialFormState);
    };

    const handleCancel = () => {
        setForm(initialFormState);
        onCancel && onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-4 space-y-4">
            <h2 className="text-lg font-semibold">
                {editingProduct ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            <div className="flex gap-4 flex-wrap items-end">
                {form.images.length > 0 && form.images.map((imgUrl, idx) => (
                    <div key={idx} className="relative w-40 h-40 group">
                        <img
                            src={imgUrl}
                            alt={`Imagen ${idx + 1}`}
                            className="w-full h-full object-cover rounded-lg group-hover:opacity-20 transition absolute"
                        />

                        <IconButton
                            size="small"
                            onClick={() => setShowImageModal({ index: idx, url: imgUrl })}

                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                zIndex: 10,
                                transition: 'color 300ms ease, background-color 300ms ease',
                                '&:hover': {

                                    color: 'white', //
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                }
                            }}
                        >
                            <EditIcon fontSize="medium" />
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={() =>
                                setForm(prev => ({
                                    ...prev,
                                    images: prev.images.filter((_, i) => i !== idx),
                                }))
                            }

                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 10,
                                transition: 'color 300ms ease, background-color 300ms ease',
                                color: "#d10003",
                                '&:hover': {
                                    color: 'white', //
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                }
                            }}
                        >
                            <DeleteIcon fontSize="medium" />
                        </IconButton>
                    </div>

                ))}

                <button
                    type="button"
                    onClick={() => setShowImageModal({ index: null, url: "" })}
                    className="w-40 h-40 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100"
                >
                    + Agregar imagen
                </button>

                {!editingProduct && <CsvUploadButton />}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <TextField
                    name="productCode"
                    label="Código de producto"
                    type="number"
                    value={form.productCode}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="name"
                    label="Nombre"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="unitPrice"
                    label="Precio Normal"
                    type="number"
                    value={form.unitPrice}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="discount"
                    label="Descuento (%)"
                    type="number"
                    value={form.discount}
                    onChange={handleChange}
                />
                <TextField
                    name="price"
                    label="Precio con Descuento"
                    type="number"
                    value={form.price}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    name="stock"
                    label="Stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="calification"
                    label="Calificación"
                    type="number"
                    step="0.1"
                    value={form.calification}
                    InputProps={{ readOnly: true }}
                />

                <CategoryModal
                    categories={categories}
                    selected={form.categories}
                    onChange={(newCategories) => setForm(prev => ({ ...prev, categories: newCategories }))}
                />
            </div>

            <FormControl fullWidth>
                <InputLabel id="brand-label">Marca</InputLabel>
                <Select
                    labelId="brand-label"
                    label="Marca"
                    name="brand"
                    value={form.brand?.id || ""}
                    onChange={(e) => {
                        const brandId = parseInt(e.target.value);
                        const selectedBrand = brands.find((b) => b.id === brandId);
                        setForm((prev) => ({ ...prev, brand: selectedBrand }));
                    }}
                    required
                >
                    <MenuItem value="">Seleccionar marca</MenuItem>
                    {brands.map((b) => (
                        <MenuItem key={b.id} value={b.id}>
                            {b.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextareaAutosize
                name="description"
                placeholder="Descripción"
                value={form.description}
                onChange={handleChange}
                className="border rounded-lg p-2 w-full min-h-[80px] mt-4"
            />

            <div className="grid grid-cols-2 gap-4">
                {["hero", "active", "new", "bestSeller", "featured"].map(field => (
                    <FormControlLabel
                        key={field}
                        control={<Checkbox name={field} checked={form[field]} onChange={handleChange} />}
                        label={field.charAt(0).toUpperCase() + field.slice(1)}
                    />
                ))}
            </div>

            <div className="flex gap-3">
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: 'green',
                        color: 'white',
                        '&:hover': { backgroundColor: 'darkgreen' },
                    }}
                >
                    {editingProduct ? "Actualizar" : "Guardar"}
                </Button>

                {editingProduct && (
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{
                            color: 'darkred',
                            borderColor: 'darkred',
                            '&:hover': { backgroundColor: 'darkred', color: 'white', borderColor: 'darkred' },
                        }}
                        onClick={handleCancel}
                    >
                        Cancelar
                    </Button>
                )}
            </div>


            {showCategories && (
                <CategoryModal
                    categories={categories}
                    selectedCategories={form.categories}
                    onSave={(selected) => setForm({ ...form, categories: selected })}
                    onClose={() => setShowCategories(false)}
                />
            )}

            {showImageModal && (
                <ImageEditModal
                    initialUrl={showImageModal.url}
                    onSave={(newUrl) => {
                        setForm(prev => {
                            let updatedImages = [...prev.images];
                            if (showImageModal.index !== null) {
                                updatedImages[showImageModal.index] = newUrl;
                            } else {
                                updatedImages.push(newUrl);
                            }
                            return { ...prev, images: updatedImages };
                        });
                        setShowImageModal(false);
                    }}
                    onClose={() => setShowImageModal(false)}
                />
            )}
        </form>
    );
}
