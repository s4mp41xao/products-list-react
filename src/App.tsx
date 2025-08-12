import { useEffect, useState, useRef, type FormEvent } from 'react'
import { FiTrash } from 'react-icons/fi'
import { api } from './services/api'

interface ProductsData {
  color: string
  capacity: string
  price: number
}

interface ProductsProps {
  id: string
  name: string
  data: ProductsData | null
}

function App() {
  const [products, setProducts] = useState<ProductsProps[]>([])
  const productRef = useRef<HTMLInputElement | null>(null)
  const coloreRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const response = await api.get('/objects')
    setProducts(response.data)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!productRef.current?.value || !coloreRef.current?.value) return

    const response = await api.post('/objects', {
      name: productRef.current?.value,
      data: {
        color: coloreRef.current?.value
      }
    })

    // return all products and include new product from submit
    setProducts(allProducts => [...allProducts, response.data])
  }

  async function handleDelete(id: string) {
    try {
      await api.delete(`/objects/${id}`)

      const allProducts = products.filter(product => product.id !== id)
      setProducts(allProducts)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div className="w-full min-h-screen bg-neutral-900 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">Produto</h1>

          <form className="flex flex-col my-6" onSubmit={handleSubmit}>
            <label className="font-medium text-white">Nome:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Nome do produto"
              ref={productRef}
            />
            <label className="font-medium text-white">Cor:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Cor do produto"
              ref={coloreRef}
            />

            <input
              type="submit"
              value="Cadastrar"
              className="cursor-pointer w-full p-2 bg-green-500 rounded text-white font-medium"
            />
          </form>

          <section className="flex flex-col gap-4">
            {products.map(product => (
              <article
                key={product.id}
                className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
              >
                <p>
                  <span className="font-medium">Nome:</span>
                  {product.name}
                </p>
                <p>
                  <span className="font-medium">Cor:</span>{' '}
                  {product.data?.color}
                </p>
                <p>
                  <span className="font-medium">Capacidade:</span>
                  {product.data?.capacity}
                </p>
                <p>
                  <span className="font-medium">Preço:</span>
                  {product.data?.price}
                </p>

                <button
                  className="bg-neutral-800 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2"
                  onClick={() => handleDelete(product.id)}
                >
                  <FiTrash size={18} color="red" />
                </button>
              </article>
            ))}
          </section>
        </main>
      </div>
    </>
  )
}

export default App
