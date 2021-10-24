import {
    Flex, Box, Text, Spinner, Center, Grid, GridItem, useDisclosure, ModalOverlay,
    Modal, ModalBody, ModalCloseButton, ModalContent, Skeleton, ModalHeader
} from '@chakra-ui/react'
import useSWR from 'swr'
import { api } from '../services'
import { AiFillCamera } from 'react-icons/ai'
import { isNull } from 'lodash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useState } from 'react'
import Loader from '../components/loader'

const fetcher = async url => {
    try {
        // eslint-disable-next-line no-async-promise-executor
        const data = await new Promise(async (res, rej) => {
            try {
                const response = await api.get("/products?limit=20&sortBy=name:asc&skip=0")
                res(response.data)
            } catch (e) {
                rej("Erro ao consultar a api")
            }
        })
        return data
    } catch (e) {
        return
    }
}

export default function Home({ products, setProducts, hasMore, setHasMore, pageCount, setPageCount, searchTerm, loadingProducts }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [product, setProduct] = useState({
        code: '',
        name: '',
        brands: [],
        packages: [],
        categories: [],
        stores: [],
        imageUrl: ''
    })
    const { data, error } = useSWR(`/products`, fetcher, {
        onSuccess: (data, key, config) => {
            setProducts(data)
            setHasMore(data.count > 20)
        }
    })

    async function fetchMoreData() {
        if (products.documents.length >= products.count)
            return setHasMore(false)

        const response = await api.get(`/products?limit=${(pageCount + 1) * 20}&sortBy=name:asc&skip=0${searchTerm != '' ? `&name=${searchTerm}` : ''}`)
        setPageCount(pageCount + 1)
        setProducts(response.data)
    }

    function handleProductClick(product) {
        setProduct(product)

        onOpen()

        // img.src = product.imageUrl
    }

    if (!data && !error) return <Loader loadingProducts={loadingProducts} />
    if (error) return "ERRO"

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
                <ModalOverlay />
                <ModalContent borderRadius={['0', '6px']}>
                    <ModalHeader>Detalhe do Produto</ModalHeader>
                    <ModalCloseButton onClick={onClose} />
                    <ModalBody p="5">
                        <Flex mb="5">
                            <Center w="40%" p="2">
                                {
                                    !isNull(product.imageUrl) ? (
                                        <img src={product.imageUrl} style={{ height: '150px' }} />
                                    ) : (
                                        <Center h="100px" flexDir="column">
                                            <AiFillCamera fontSize="64px" color="rgba(0, 0, 0, 0.5)" />
                                            <Text color="rgba(0, 0, 0, 0.8)" >Sem Foto</Text>
                                        </Center>
                                    )
                                }
                            </Center>
                            <Box w="60%" p="2" px="12">
                                <Grid templateColumns="repeat(12, 1fr)" gap={3}>
                                    <GridItem colSpan={12}>
                                        <Text fontSize="18px" color="rgb(64, 64, 64)" fontWeight="600">{product.name}</Text>
                                        <Text fontSize="12px" color="rgba(0, 0, 0, 0.5)" fontWeight="600">#{product.code}</Text>
                                    </GridItem>
                                    <GridItem colSpan={12}>
                                        <Text fontSize="12px" fontWeight="500">Quantidade</Text>
                                        <Text fontSize="14px" color="rgb(64, 64, 64)">{product.amount}</Text>
                                    </GridItem>
                                    <GridItem colSpan={12}>
                                        <Text fontSize="12px" fontWeight="500">Marcas</Text>
                                        <Text fontSize="14px" color="rgb(64, 64, 64)">
                                            {product.brands && product.brands.length > 0 ? product.brands.reduce((acc, cur) => `${cur.name}, ${acc}`, '').replace(/,\s*$/, "") : 'sem nenhuma marca'}
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={12}>
                                        <Text fontSize="12px" fontWeight="500">Pacotes</Text>
                                        <Text fontSize="14px" color="rgb(64, 64, 64)">
                                            {product.packages && product.packages.length > 0 ? product.packages.reduce((acc, cur) => `${cur.name}, ${acc}`, '').replace(/,\s*$/, "") : 'sem nenhum pacote'}
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={12}>
                                        <Text fontSize="12px" fontWeight="500">Categorias</Text>
                                        <Text fontSize="14px" color="rgb(64, 64, 64)">
                                            {product.categories && product.categories.length > 0 ? product.categories.reduce((acc, cur) => `${cur.name}, ${acc}`, '').replace(/,\s*$/, "") : 'sem nenhuma categoria'}
                                        </Text>
                                    </GridItem>
                                    <GridItem colSpan={12}>
                                        <Text fontSize="12px" fontWeight="500">Lojas</Text>
                                        <Text fontSize="14px" color="rgb(64, 64, 64)">
                                            {product.stores && product.stores.length > 0 ? product.stores.reduce((acc, cur) => `${cur.name}, ${acc}`, '').replace(/,\s*$/, "") : 'sem nenhuma loja'}
                                        </Text>
                                    </GridItem>
                                </Grid>
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {
                loadingProducts ? (
                    <Loader loadingProducts={loadingProducts} />
                ) : (
                    <InfiniteScroll
                        style={{ padding: '64px' }}
                        dataLength={products.documents.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={
                            products.documents.length > 20 ? (
                                <Loader loadingProducts={loadingProducts} />
                            ) :
                                (<></>)
                        }
                        height="91vh"
                        scrollThreshold={0.9}
                        endMessage={
                            products.documents.length > 20 || products.documents.length == 0 ? (
                                <p style={{ textAlign: 'center' }}>
                                    <b>Sem nenhum produto</b>
                                </p>
                            ) :
                                (<></>)
                        }
                    >
                        <Grid templateColumns="repeat(12, 1fr)" gap={15}>
                            {
                                products.documents.map(p => {
                                    return (
                                        <GridItem
                                            key={p.code + p.createdAt}
                                            colSpan={[12, 12, 6, 4]}
                                            p="5"
                                            py="10"
                                            _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
                                            onClick={() => handleProductClick(p)}
                                        >
                                            <Flex justifyContent="center">
                                                {
                                                    !isNull(p.imageUrl) ? (
                                                        <img src={p.imageUrl} alt={p.name} style={{ height: '100px' }} />
                                                    ) : (
                                                        <Center h="100px" flexDir="column">
                                                            <AiFillCamera fontSize="64px" color="rgba(0, 0, 0, 0.5)" />
                                                            <Text color="rgba(0, 0, 0, 0.8)" >Sem Foto</Text>
                                                        </Center>
                                                    )
                                                }
                                            </Flex>
                                            <Text mt="5" fontSize="12" color="rgba(64, 64, 64, 0.6)">
                                                #{p.code}
                                            </Text>
                                            <Text mt="2" fontSize="16" color="rgb(64, 64, 64)">
                                                {p.name}
                                            </Text>
                                        </GridItem>
                                    )
                                })
                            }
                        </Grid>
                    </InfiniteScroll>
                )
            }
        </Box>
    )
}