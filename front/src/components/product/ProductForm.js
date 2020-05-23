import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchCategories, addProduct } from "../../api"

export default function ProductForm() {
  const [categoriesOption, setCategoriesOption] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function asyncFetchCategories() {
      const categories = await fetchCategories();
      const options = categories.map((c) =>
        <option key={c.id} value={c.id}>{c.name}</option>
      )
      setCategoriesOption(options);
      setLoading(false);
      console.log()
    }
    asyncFetchCategories();
  }, []);

  const { register, handleSubmit } = useForm();
  const onSubmit = product => { addProduct(product) };

  if (isLoading) {
    return "loading";
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      nazwa:
      <input name="name" type="text" ref={register} />
          opis:
      <textarea name="details" ref={register}></textarea>
          kategoria:
      <select name="category" ref={register}>
        {categoriesOption}
      </select>
          link do zdjecia:
      <input name="imagePath" type="text" ref={register} />
          cena:
      <input type="number" step="0.01" name="price" type="number" ref={register} />
      <button type="submit">Dodaj</button>
    </form>
  );

}
