import './Category.css'
const Category = ({categoryName, imgUrl, numberOfItems, bgColor, isSelected, onClick}) => {
    return (
        
         <div className="d-flex align-items-center p-3 rounded gap-1 position-relative category-hover" 
         style={{backgroundColor: bgColor, cursor: 'pointer'}} onClick={onClick}>
            <div style={{position: 'relative', marginRight: '15px'}}>
                <img src={imgUrl} alt={categoryName} className="category-image"/>
            </div>
            <div>
                <h6 className="mb-1 text-white">{categoryName}</h6>
                <p className="mb-0 text-white-50" style={{fontSize: '12px'}}>{numberOfItems} Items</p>
            </div>
            {isSelected &&<div className="active-category"></div>}
         </div> 
    )
}   
export default Category;
