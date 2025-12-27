import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './CategoryList.css';
import { useState } from 'react';
import { deleteCategory } from '../../Service/CategoryService';
import {toast} from 'react-hot-toast';



const CategoryList = () => {

  const {categories, setCategories, itemsData = []} = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deletebyCategoryId = async (categoryId) => {
    try{
      const response = await deleteCategory(categoryId);
      if(response.status === 204){
        const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
        setCategories(updatedCategories);
        toast.success("Category deleted successfully");
      }
      else
        toast.error("Failed to delete category");
    }
    catch(error){
      console.error( error);
    }
  }


  return (

   <div className="category-list-container" style={{ overflowY: 'auto', height: '100vh', overflowX: 'hidden' }}> 
      <div className="row pe-2">
        <div className="input-group mb-3">
          <input type="text" 
                  name="keyword" 
                  id="keyword" 
                  placeholder="Search by keyboard" 
                  className="form-control"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  />
          <span className="input-group-text bg-warning">
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
      <div className="row g-3 pe-2">
        {filteredCategories.map((category, index) => {
          const count =
            itemsData.filter(
              (item) =>
                item.categoryId === category.categoryId ||
                item.categoryName === category.name
            ).length || category.itemCount || 0;

          return (
          <div key={index} className="col-12">
            <div className="card p-3 " style={{backgroundColor: category.bgColor}}>
              <div className="d-flex align-items-center">
                <div style={{marginRight: '15px'}}>
                  <img 
                    src={category.imageUrl} 
                    alt={category.name}
                    className="category-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="text-white mb-1">{category.name}</h5>
                  <p className="text-white mb-0">{count} items</p>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" 
                          onClick={()=> deletebyCategoryId(category.categoryId)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
          </div>
          </div>
          );
        })}
      </div>
    </div>

  )
}   
export default CategoryList;
