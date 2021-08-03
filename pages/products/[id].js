import { useRouter } from 'next/router'
import { server } from '../../config/index'

const product = ({ product }) => {
    return (
        <>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
        </>
    )
}

export const getStaticProps = async (context) => {
    const res = await fetch(`${server}/api/products/${context.params.id}`)
    const product = await res.json()

    return {
        props: {
            product
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`${server}/api/products`)
    const products = await res.json()
    const ids = products.map((product) => product.productId)
    const paths = ids.map((id) => ({ params: { id: id.toString() } }))

    return {
        paths,
        fallback: false,
    }
}

export default product