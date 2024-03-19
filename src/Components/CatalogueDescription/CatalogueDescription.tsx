import { useAppStore } from "../../AppStore";
import "./CatalogueDescription.css";
import { useCatalogueStore } from "../Catalogue/CatalogueStore";
import { useProductStore } from "../Products/ProductStore";
export function CatalogueDescription() {
    const { page, isAllowed,setPage } = useAppStore();
    const { catalogue, selectedCategory } = useCatalogueStore();
    const {fetchProducts}= useProductStore();
    return isAllowed(page, 'catalogue_description') && (
        <div className="catalogue-description">
            <p className="description">
                {catalogue?.label} {selectedCategory?.id}{selectedCategory?.description}
            </p>
            <span className="see-all" onClick={() => {
                console.log('##########');
                
                fetchProducts({
                    filter:{
                        category_id:selectedCategory?.id
                    }
                }).then(()=>{
                    setPage(page == 'catalogue' ? 'product' : 'catalogue')
                })
            }}> See all {selectedCategory?.label}</span>
        </div>
    )
}