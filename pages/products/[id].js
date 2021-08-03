import { server } from '../../config/index'
import Layout from '../../components/layout'

const product = (props) => {
    return (
        <Layout menu={props.menu}>
            <h1>{props.product.name}</h1>
            <p>{props.product.description}</p>
            <p>${props.product.price}</p>
        </Layout>
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