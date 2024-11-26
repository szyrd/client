import React, { useState } from 'react';
import axios from 'axios';

const ExpenseForm: React.FC = () => {
  const [formData, setFormData] = useState({
    date: '',
    sum: '',
    category: 'Food',
    comment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/expenses', formData);
      console.log('Success:', response.data);
      alert('Expense added successfully!');
      setFormData({ date: '', sum: '', category: 'Food', comment: '' });
    } catch (err: any) {
      console.error('Error:', err.response ? err.response.data : err.message);
      alert('Error saving expense!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Sum:
        <input
          type="number"
          name="sum"
          value={formData.sum}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Other">Other</option>
        </select>
      </label>
      <label>
        Comment:
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;



