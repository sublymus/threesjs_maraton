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
                {catalogue?.name} {selectedCategory?.id}{selectedCategory?.description}
            </p>
            <span className="see-all" onClick={() => {
                fetchProducts({
                    filter:{
                        category_id:selectedCategory?.id
                    }
                })
                setPage(page == 'catalogue' ? 'product' : 'catalogue')
            }}> See all {selectedCategory?.name}</span>
        </div>
    )
}