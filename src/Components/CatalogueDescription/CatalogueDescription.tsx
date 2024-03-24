import { useAppStore } from "../../AppStore";
import "./CatalogueDescription.css";
import { useCatalogueStore } from "../Catalogue/CatalogueStore";
import { useProductStore } from "../Products/ProductStore";
export function CatalogueDescription() {
    const {  check,setAbsPath } = useAppStore();
    const { catalogue, selectedCategory } = useCatalogueStore();
    const {fetchProducts}= useProductStore();
    return check( 'catalogue_description') && (
        <div className="catalogue-description">
            <p className="description">
                {catalogue?.label} {selectedCategory?.id}{selectedCategory?.description}
            </p>
            <span className="see-all" onClick={() => {
                fetchProducts({
                    filter:{
                        category_id:selectedCategory?.id
                    }
                }).then(()=>{
                    setAbsPath(['product'])
                })
            }}> See all {selectedCategory?.label}</span>
        </div>
    )
}