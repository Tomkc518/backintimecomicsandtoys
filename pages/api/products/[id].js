import { ProductList } from '../../../data/products'

export default function handler({ query: { id }}, res) {
    const filtered = ProductList.filter(product => product.productId === parseInt(id))

    if(filtered.length > 0){
        res.status(200).json(filtered[0])    
    } else {
        res
            .status(404)
            .json({ message: `Product {id} is not found`})
    }
}