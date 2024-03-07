import { useAppStore } from "../../AppStore";
import "./CatalogueDescription.css";
import { useCatalogueStore } from "../Catalogue/CatalogueStore";
export function CatalogueDescription() {
    const { page, isAllowed } = useAppStore();
    const {info} = useCatalogueStore()
    return (
        isAllowed(page, 'catalogue_description') && <div className="catalogue-description">
            {info?.selectedProduct?.description}
            Une bague est un bijou qui se porte généralement au doigt en forme d'anneau, plus ou moins large, serti ou non de pierres et quelquefois gravé. Au même titre que les boucles d'oreilles, les bagues peuvent être constituées de toutes sortes de matériaux, incluant métal, plastique, bois, os et verre   
        </div>
    )
}