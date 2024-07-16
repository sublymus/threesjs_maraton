import { useAppRouter } from "../../AppStore";
import "./CatalogueDescription.css";
import { useCatalogueStore } from "../Catalogue/CatalogueStore";
import { useProductStore } from "../Products/ProductStore";
export function CatalogueDescription() {
    const {  check,qs } = useAppRouter();
    const { catalogue, selectedCategory,  } = useCatalogueStore();
    const {fetchProducts , selectProduct}= useProductStore();
    return check( 'catalogue_description') && (
        <div className="catalogue-description">
            <p className="description">
                {catalogue?.label} {selectedCategory?.id}{selectedCategory?.description}
            </p>
            <span className="see-all" onClick={() => {
                console.log({selectedCategory});
                
                fetchProducts({
                    query:{
                        category_id:selectedCategory?.id
                    }
                }).then((list)=>{
                    if(!list?.list[0]) return
                    selectProduct(list.list[0])
                    qs({product_id:list?.list[0].id}).setAbsPath(['product'])
                })
            }}> See all {selectedCategory?.label}</span>
        </div>
    )
}