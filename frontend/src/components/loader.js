import {
    Grid, GridItem, Skeleton
} from '@chakra-ui/react'

export default function Loader({ loadingProducts }) {
    return (
        <Grid templateColumns="repeat(12, 1fr)" gap={15} p="64px">
            <GridItem
                colSpan={[12, 12, 6, 4]}
                p="5"
                py="10"
            >
                <Skeleton height="275px" isLoaded={loadingProducts} />
            </GridItem>
            <GridItem
                colSpan={[12, 12, 6, 4]}
                p="5"
                py="10"
            >
                <Skeleton height="275px" isLoaded={loadingProducts} />
            </GridItem>
            <GridItem
                colSpan={[12, 12, 6, 4]}
                p="5"
                py="10"
            >
                <Skeleton height="275px" isLoaded={loadingProducts} />
            </GridItem>
        </Grid>
    )
}