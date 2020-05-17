import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchCategories } from "../api"

export default function ProductForm() {
  const [categoriesOption, setCategoriesOption] = useState([])
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const categories = await fetchCategories();
      const options = categories.map((c) =>
        <option key={c.id} value={c.id}>{c.name}</option>
      )
      setCategoriesOption(options);
      setLoading(false);
    }
    fetchData();
  },[]);

  const { register, handleSubmit} = useForm();
  const onSubmit = data => console.log(data);

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
