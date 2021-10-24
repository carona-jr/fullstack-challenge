import puppeteer from 'puppeteer'
import Log from '../../models/log'
import Product from '../../models/product'

const extractProducts = async (url, pageCount, pageLimit, browser) => {
    const page = await browser.newPage()
    await page.goto(url)
    const urls = await page.evaluate(async () => Array.from(document.querySelectorAll('.list_product_a')).map(a => a.href))

    let products = []
    await Promise.all(urls.map(async link => {
        const detailPage = await browser.newPage()
        try {
            await detailPage.goto(link)
            await detailPage.waitForSelector('#barcode')

            const product = await detailPage.evaluate(() => {
                const code = document.querySelector('#barcode')
                const name = document.querySelector('#field_generic_name_value > span')
                const productTitle = document.querySelector('h1')
                const amount = document.querySelector('#field_quantity_value')
                const brands = document.querySelector('#field_brands_value')
                const categories = document.querySelector('#field_categories_value')
                const packages = document.querySelector('#field_packaging_value')
                const stores = document.querySelector('#field_stores_value')
                let imageUrl = ''

                try {
                    imageUrl = document.querySelector('#image_box_front').children[0].children[1].src
                } catch {
                    imageUrl = ''
                }

                return {
                    code: code ? code.innerText : '',
                    name: name ? name.innerText : productTitle ? productTitle.innerText : 'no name',
                    amount: amount ? amount.innerText : '',
                    brands: brands ? Array.from(brands.children).filter(e => e.nodeName == 'A').map(e => ({ name: e.innerText, url: e.href })) : null,
                    categories: categories ? Array.from(categories.children).filter(e => e.nodeName == 'A').map(e => ({ name: e.innerText, url: e.href })) : null,
                    packages: packages ? Array.from(packages.children).filter(e => e.nodeName == 'A').map(e => ({ name: e.innerText, url: e.href })) : null,
                    stores: stores ? Array.from(stores.children).filter(e => e.nodeName == 'A').map(e => ({ name: e.innerText, url: e.href })) : null,
                    imageUrl
                }
            })

            products.push(product)
        } catch (e) {
            const log = new Log({ status: 'ERROR', type: 'LOADING', message: e.message })
            await log.save()
        } finally {
            await detailPage.close()
        }
    }))

    await page.close()

    if (products.length < 1 || pageCount == pageLimit)
        return products

    const nextUrl = `https://world.openfoodfacts.org/${pageCount}`
    return products.concat(await extractProducts(nextUrl, ++pageCount, pageLimit, browser))
}

const scrapProducts = async () => {
    const browser = await puppeteer.launch()
    let pageCount = 1, pageLimit = 1, numProductSaved = 0
    let firstUrl = `https://world.openfoodfacts.org/${pageCount}`
    let products = await extractProducts(firstUrl, pageCount, pageLimit, browser)

    while (products.length > 0 && numProductSaved <= 100) {
        await Promise.all(products.map(async product => {
            const isProductAlreadySaved = await Product.findOne({ code: product.code })

            if (!isProductAlreadySaved) {
                try {
                    const newProduct = new Product({
                        ...product,
                        // eslint-disable-next-line camelcase
                        imported_t: new Date()
                    })
                    await newProduct.save()
                    numProductSaved++
                } catch (e) {
                    const log = new Log({ status: 'ERROR', code: product.code ? product.code : 'no code', type: 'SAVING', message: e.message })
                    await log.save()
                }
            }
        }))

        firstUrl = `https://world.openfoodfacts.org/${++pageCount}`
        products = await extractProducts(firstUrl, pageCount, ++pageLimit, browser)
    }

    await browser.close()
}

export default scrapProducts