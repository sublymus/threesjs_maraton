//@ts-nocheck
import { GenericList, type MapperBuilder } from './/GenericList'

export function ProductList() {
    const { check } = useDashRoute();
    return check('list_product') && (
        <div className="product-list">
            <div className="list-ctn">
                <GenericList items_height={80} id={'product_list'} datas={DataBase.rings_Products} itemsMapper={{
                    images: GenericList.ImageElement({ size: 80 }),
                    id: GenericList.StringElement({ resizable: false }),
                    title: GenericList.StringElement({ size_interval: [50, 200] }),
                    status: GenericList.StringElement(),
                    stock: GenericList.StringElement(),
                    category_id: GenericList.StringElement(),
                    price: GenericList.StringElement(),
                    features: GenericList.StringElement(),
                    created_at: GenericList.StringElement(),
                }} />
            </div>
        </div>
    )
}


/// cree test propre celules

const MyElement: MapperBuilder = (option) => {
    return {
        getView(colunmName, value) {
            const view = document.createElement('div');
            view.textContent = value?.toString();
            return view
        },
        option
    }
};


/// complete les option

const MyElement: MapperBuilder<{ hoverColor?: string }> = (option) => {
    return {
        getView(colunmName, value) {
            const view = document.createElement('div');
            view.textContent = value?.toString();
            ///fait ce que tu veux avec option.hoverColor
            return view
        },
        option
    }
};

/// complete les option

const MyNewStringElement: MapperBuilder<{ hoverColor?: string }> = (option) => {
    return {
        getView(label, value, e) {
            // adatpt les option
            const view = GenericList.StringElement({ ...option }).getView();
            /// modifit la view
            return view
        },
        option
    }
};