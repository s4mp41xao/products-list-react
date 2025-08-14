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
  const capacityRef = useRef<HTMLInputElement | null>(null)
  const priceRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const response = await api.get('/objects')
    setProducts(response.data)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (
      !productRef.current?.value ||
      !coloreRef.current?.value ||
      !capacityRef.current?.value ||
      !priceRef.current?.value
    ) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    try {
      const response = await api.post('/objects', {
        name: productRef.current?.value,
        data: {
          color: coloreRef.current?.value,
          capacity: capacityRef.current?.value,
          price: priceRef.current?.value
        }
      })

      // return all products and include new product from submit
      setProducts(allProducts => [...allProducts, response.data])
    } catch (err) {
      console.log(err)
    }

    // Limpar os campos do formulário
    if (productRef.current) productRef.current.value = ''
    if (coloreRef.current) coloreRef.current.value = ''
    if (capacityRef.current) capacityRef.current.value = ''
    if (priceRef.current) priceRef.current.value = ''
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
          <h1 className="text-4xl font-medium text-white">
            Cadastro de Produtos
          </h1>

          <form className="flex flex-col my-6" onSubmit={handleSubmit}>
            <label className="font-medium text-white">Nome:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Nome do produto"
              ref={productRef}
            />
            <label className="font-medium text-white">Capacidade:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Capacidade do produto"
              ref={capacityRef}
            />
            <label className="font-medium text-white">Cor:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Cor do produto"
              ref={coloreRef}
            />
            <label className="font-medium text-white">Preço:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="number"
              placeholder="Preço do produto"
              ref={priceRef}
            />

            <input
              type="submit"
              value="Cadastrar"
              className="cursor-pointer w-full p-2 bg-green-500 rounded text-white font-medium"
            />
          </form>

          <section className="flex flex-col gap-4">
            <h2 className="text-4xl font-medium text-white">
              Produtos Cadastrados
            </h2>
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
                  <span className="font-medium">Capacidade: </span>
                  {product.data?.capacity}
                </p>
                <p>
                  <span className="font-medium">Cor:</span>{' '}
                  {product.data?.color}
                </p>
                <p>
                  <span className="font-medium">Preço: </span>
                  {product.data?.price}
                </p>

                <button
                  className="bg-red-700 w-8 h-full flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2"
                  onClick={() => handleDelete(product.id)}
                >
                  <FiTrash size={18} color="white" />
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
