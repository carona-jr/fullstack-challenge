import Layout from './templates'
import Home from './pages/home'
import { useState, useEffect } from 'react'
import { api } from './services'

function App() {
    const [products, setProducts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [pageCount, setPageCount] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [firstLoad, setFirstLoad] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)

    useEffect(() => {
        if (firstLoad)
            return setFirstLoad(false)

        const timeOutId = setTimeout(() => handleSearch(), 800)
        return () => clearTimeout(timeOutId)
    }, [searchTerm])

    async function handleSearch() {
        setLoadingProducts(true)
        const response = await api.get(`/products?limit=20&sortBy=name:asc&skip=0${searchTerm != '' ? `&name=${searchTerm}` : ''}`)
        setPageCount(1)
        setProducts(response.data)
        setLoadingProducts(false)
    }

    return (
        <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch}>
            <Home
                products={products}
                setProducts={setProducts}
                hasMore={hasMore}
                setHasMore={setHasMore}
                pageCount={pageCount}
                setPageCount={setPageCount}
                searchTerm={searchTerm}
                loadingProducts={loadingProducts}
            />
        </Layout>
    )
}

export default App