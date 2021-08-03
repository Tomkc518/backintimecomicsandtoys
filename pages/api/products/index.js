import { ProductList } from '../../../data/products'

export default function handler(req, res) {
    res.status(200).json(ProductList);
}