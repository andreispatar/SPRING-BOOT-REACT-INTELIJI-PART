import React, { useEffect, useState, useContext } from "react";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";
import { addCategory } from "../../Service/CategoryService";


const CategoryForm = () => {
  const { setCategories, categories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    bgColor: "#2c2c2c",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!image){
      toast.error("Please select an image");
      setLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("category", JSON.stringify(data));
    formData.append("file", image);
    try{
      const response = await addCategory(formData);
      if(response.status === 201){
        setCategories([...categories, response.data]);
        toast.success("Category added successfully");
        setData({
          name: "",
          description: "",
          bgColor: "#2c2c2c",
        });
        setImage(null);
      }
    }
    catch(err){
      console.log(err);
      toast.error("Error adding category");
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-12 form-container">
          <div className="card-body">
            <form onSubmit={onSubmitHandler}>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" width={48} />
                </label>
                <input
                  name="image"
                  type="file"
                  id="image"
                  className="form-control"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Category Name"
                      onChange={onChangeHandler}
                      value={data.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      rows="5"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Write Content here"
                      onChange={onChangeHandler}
                      value={data.description}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="bgColor" className="form-label">Background Color</label>
                    <br/>
                    <input
                      type="color"
                      id="bgColor"
                      name="bgColor"
                      onChange={onChangeHandler}
                      value={data.bgColor}
                      placeholder="#ffffff"
                    />
                </div>
                <button type="submit" disabled={loading} className="btn btn-warning w-100">{loading ? "Loading..." : "Submit"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;
