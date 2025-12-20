const ItemsForm = () => {
  return (
    <div className="item-form-container" style={{height: '100vh', overflowY: 'auto',overflowX: 'hidden'}}>
                <div className="mx-2 mt-2">
      <div className="row">
        <div className="card col-md-8 form-container">
          <div className="card-body">
            <form>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  <img src="https://placehold.co/48x48" alt="" width={48} />
                </label>
                <input name="image" type="file" id="image" className="form-control" hidden/>
              </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Item Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea  rows="5" className="form-control" id="description" name="description" placeholder="Write Content here"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select className="form-control" id="category" name="category">
                        <option value="">Select Category</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Home">Home</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price" name="price" placeholder="Item Price"/>
                </div>
                <button type="submit" className="btn btn-warning w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
export default ItemsForm;
