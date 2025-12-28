import { useContext } from 'react';
import './DisplayCategory.css';
import Category from '../Category/Category.jsx';
import { AppContext } from '../../context/AppContext.jsx';
import { assets } from '../../assets/assets.js';

const DisplayCategory = ({selectedCategory, setSelectedCategory, categories }) => {
  const { itemsData = [] } = useContext(AppContext);

  const resolveImage = (category) => {
    const candidate = category.imageUrl || category.imgUrl || category.imagePath;
    if (!candidate) return assets.upload;
    if (candidate.startsWith('http')) return candidate;
    return `http://localhost:8080/${candidate.replace(/^\//, '')}`;
  };

  return (
    <div className="row g-3" style={{width: '100%', margin: 0}}>
      {categories.map((category) => {
        const categoryKey = category.categoryId ?? category.name;
        const count = itemsData.filter(
          (item) =>
            item.categoryId === category.categoryId ||
            item.categoryName === category.name
        ).length || category.itemCount || 0;

        return (
          <div key={categoryKey} className="col-md-3 col-sm-3"  style={{padding: '0 10px'}}>
            <Category
              categoryName={category.name}
              imgUrl={resolveImage(category)}
              numberOfItems={count}
              bgColor={category.bgColor}
              isSelected={`${selectedCategory}` === `${categoryKey}`}
              onClick={() => setSelectedCategory(categoryKey)}
            />
          </div>
        );
      })}
    </div>  
    )
}
export default DisplayCategory;
