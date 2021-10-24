import {
    Flex, Box, Text, InputRightElement, Input, InputGroup, Button
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import { isNull } from 'lodash'

export default function Layout({ children, searchTerm, setSearchTerm, handleSearch }) {
    return (
        <Box w="100vw" minH="100vh" bgColor="white">
            <Flex w="100vw" flexDirection="column">
                <Flex h="9vh" alignItems="center" justifyContent="space-between" p="5" boxShadow="md" bgColor="blue.500">
                    <Box>
                        <Text fontWeight="600" fontSize="large" fontSize="28px" opacity={0.85} color="#fff">Produtos</Text>
                    </Box>
                    <Box>
                        <InputGroup>
                            <Input
                                value={searchTerm || ''}
                                w="400px"
                                variant="filled"
                                placeholder="pesquise..."
                                onChange={e => setSearchTerm(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key == 'Enter' && !isNull(searchTerm)) {
                                        setSearchTerm(e.target.value)
                                    }
                                }}
                                color="rgb(153, 153, 153)"
                                _focus={{}}
                            />
                            <InputRightElement>
                                <Button p="0" onClick={handleSearch}>
                                    <BsSearch />
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                </Flex>
                <Box>
                    {children}
                </Box>
            </Flex>
        </Box>
    )
}