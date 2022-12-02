import Category from '../routes/category/category.component';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../routes/categories-preview/categories-preview.component';
import './shop.style.scss'



const Shop = () => {
    
    
  return (
    <Routes>
      <Route index element={<CategoriesPreview/>}/>
      <Route path=':category' element={<Category/>}/>
    </Routes>
  )
}

export default Shop;
