import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteItem } from "../../Service/ItemService.js";
import { assets } from "../../assets/assets.js";
import "./ItemList.css";

const resolveImage = (item) => {
  const candidate = item.imageUrl || item.image || item.imagePath;
  if (!candidate) return assets.upload;
  if (candidate.startsWith("http://") || candidate.startsWith("https://")) {
    return candidate;
  }
  // handle relative paths returned by the API
  return `http://localhost:8080/${candidate.replace(/^\//, "")}`;
};

const ItemsList = () => {

  const { itemsData , setItemsData} = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = itemsData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  }
  );

  const removeItem = async (itemId) => {
      try{
        const response = await deleteItem(itemId);
        if(response.status === 204){
          const updatedItems = itemsData.filter((item) => item.itemId !== itemId);
          setItemsData(updatedItems);
          toast.success("Item deleted successfully");
        }else{
          toast.error("Error while deleting item");
        }
      }catch(error){
        console.log("Error while deleting item" , error);
        toast.error("Error while deleting item");
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
        {filteredItems.map((item, index) => (
          <div className="col-12" key={index}>
            <div className="card p-3 bg-dark">
              <div className="d-flex align-items-center">
                <div style={{marginRight: '15px'}}>
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="item-image"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1 text-white">{item.name}</h6>
                  <p className="mb-0 text-white">Category: {item.categoryName}</p>
                  <span className="mb-0 text-block badge rounded-pill text-bg-warning">
                    &#8364; {item.price}
                  </span>
                </div>
                <div>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.itemId)}>
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
export default ItemsList;
