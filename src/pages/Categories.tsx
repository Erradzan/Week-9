import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

interface Category {
  id: number;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState<{ name: string; description: string }>({ name: '', description: '' });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        setError('Failed to fetch categories');
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (formMode === 'add') {
      setNewCategory({ ...newCategory, [name]: value });
    } else if (formMode === 'edit' && editingCategory) {
      setEditingCategory({ ...editingCategory, [name]: value });
    }
  };

  const handleAddCategory = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<Category>('http://localhost:8080/categories', newCategory);
      setCategories([...categories, response.data]);
      setNewCategory({ name: '', description: '' });
    } catch (error) {
      setError('Failed to add category');
      console.error('Error adding category:', error);
    }
  };

  const handleUpdateCategory = async (e: FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      try {
        const response = await axios.put<Category>(`http://localhost:8080/categories/${editingCategory.id}`, editingCategory);
        setCategories(categories.map(cat => (cat.id === response.data.id ? response.data : cat)));
        setEditingCategory(null);
        setFormMode('add');
      } catch (error) {
        setError('Failed to update category');
        console.error('Error updating category:', error);
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/categories/${id}`);
        setCategories(categories.filter(cat => cat.id !== id));
      } catch (error) {
        setError('Failed to delete category');
        console.error('Error deleting category:', error);
      }
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    setFormMode('edit');
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-medium">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-3xl font-semibold mb-6 text-center">Categories</h1>

        <form onSubmit={formMode === 'add' ? handleAddCategory : handleUpdateCategory} className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">{formMode === 'add' ? 'Add New Category' : 'Edit Category'}</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formMode === 'add' ? newCategory.name : editingCategory?.name || ''}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formMode === 'add' ? newCategory.description : editingCategory?.description || ''}
              onChange={handleInputChange}
              className="border border-gray-300 rounded p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {formMode === 'add' ? 'Add Category' : 'Update Category'}
          </button>
          {formMode === 'edit' && (
            <button
              type="button"
              onClick={() => {
                setEditingCategory(null);
                setFormMode('add');
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          )}
        </form>

        <ul className="list-disc pl-5 space-y-4">
          {categories.map((category) => (
            <li key={category.id} className="text-lg text-gray-800">
              <h2 className="text-xl font-bold">{category.name}</h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEditClick(category)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;