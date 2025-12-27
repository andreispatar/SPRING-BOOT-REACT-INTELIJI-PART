import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets.js';
import { AppContext } from '../../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { addItem } from '../../Service/ItemService.js';





const ItemsForm = () => {

  const {categories, setItemsData, itemsData} = useContext(AppContext);

  const[image , setImage] = useState(false);
  const[loading , setLoading] = useState(false);
  const[data , setData] = useState({
    name : "", 
    categoryId : "",
    price : "",
    description : ""
  });

  const onChangeHandler = (e) => {
     const value = e.target.value;
    const name = e.target.name;
    setData((data) => ({...data , [name] : value}));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("item" , JSON.stringify(data));
    formData.append("file" , image);

    try{
      if(!image){
        toast.error("Image is required");
        return;
      }

      const response = await addItem(formData);
      if(response.status === 201){
        setItemsData([...itemsData , response.data]);
        //TODO: updated yhe category state
        toast.success("Item added successfully");
        setData({
          name : "", 
          categoryId : "",
          price : "",
          description : ""
        });
        setImage(false);
      }
      else{
        toast.error("Error while adding item");
      }
    }catch(error){
      console.log("Error while adding item" , error);
      toast.error("Error while adding item");
    }
    setLoading(false);
  }
    

  return (
    <div className="item-form-container" style={{height: '100vh', overflowY: 'auto',overflowX: 'hidden'}}>
                <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-8 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48} />
                </label>
                <input name="image" type="file" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])}/>
              </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Item Name" value={data.name} onChange={onChangeHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea  rows="5" className="form-control" id="description" name="description" placeholder="Write Content here" value={data.description} onChange={onChangeHandler}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-control" id="categoryId" name="categoryId" value={data.categoryId} onChange={onChangeHandler}>
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.categoryId}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" placeholder="Item Price" value={data.price} onChange={onChangeHandler}/>
                </div>
                <button type="submit" className="btn btn-warning w-100" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export { ItemsForm };
export default ItemsForm;
