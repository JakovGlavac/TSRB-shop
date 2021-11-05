import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero, Button } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="text-center pb-10">
        <h1 className="text-3xl font-bold">Dobro došli na tsrb.shop</h1>
        <h1 className="text-xl">Najjači web shop na ovoj strani Save</h1>
        <p className="text-md mt-5 mb-5">
          Nakon vrlo uspješnog "lansiranja" stranice, primili smo mnogo
          sugestija kako više unaprijediti korisničko iskustvo. Zbog toga želimo
          svima korisnicima omogućiti dizajniranje, želimo izgraditi zajednicu.
        </p>
        <Button onClick={() => console.log('click')}>
          Zapončni s dizajnom
        </Button>
      </div>
      <Grid variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee variant="secondary">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      <Hero
        headline="O projektu TSRB.shop"
        description={`Nadahnuće za ovaj projekt proizašlo je, prije svega, iz frustracije. Pri gotovo svakom odlasku u trgovinu neraznolikost odjeće očitovala se mojim negodovanjem. Monotona odjeća za koju bih rekao da je sva "na isti kalup" bila bi razlog mog nezadovoljstva. Zahvaljujući tome, na pamet mi je pala ideja za nekoliko majica koje bih osobno nosio.
        Možete ih pogledati na stranici.
        U slučaju da se još kome svide: epic!
        Još jedan razlog iz kojeg je izrodila ideja ovog projekta bilo bi financiranje mog završno rada.
        Napomena: svaka sličnost sa stvarnim događajima i osobama je slučajna.`}
      />
      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 1080 : 540,
              height: i === 0 ? 1080 : 540,
            }}
          />
        ))}
      </Grid>
      <Marquee>
        {products.slice(3).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} variant="slim" />
        ))}
      </Marquee>
      {/* <HomeAllProductsGrid
        newestProducts={products}
        categories={categories}
        brands={brands}
      /> */}
    </>
  )
}

Home.Layout = Layout
