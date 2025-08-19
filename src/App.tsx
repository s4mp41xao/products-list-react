import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  useMemo,
  useCallback
} from 'react'
import { FiTrash } from 'react-icons/fi'
import { api } from './services/api'

interface ProductsProps {
  id: string
  productName: string
  color: string
  memory: string
  price: number
  storage: string
}

export function App() {
  const [products, setProducts] = useState<ProductsProps[]>([])

  const productRef = useRef<HTMLInputElement | null>(null)
  const storageRef = useRef<HTMLInputElement | null>(null)
  const memoryRef = useRef<HTMLInputElement | null>(null)
  const colorRef = useRef<HTMLInputElement | null>(null)
  const priceRef = useRef<HTMLInputElement | null>(null)

  const totalProducts = useMemo(() => {
    return products.length
  }, [products])

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<ProductsProps[]>('/products')
      setProducts(response.data)
    }

    loadProducts()
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (
      !productRef.current?.value ||
      !storageRef.current?.value ||
      !memoryRef.current?.value ||
      !colorRef.current?.value ||
      !priceRef.current?.value
    ) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    try {
      const response = await api.post<ProductsProps>('/products', {
        productName: productRef.current?.value,
        color: colorRef.current?.value,
        memory: memoryRef.current?.value,
        price: Number(priceRef.current?.value),
        storage: storageRef.current?.value
      })

      // return all products and include new product from submit
      setProducts(allProducts => [...allProducts, response.data])
    } catch (err) {
      console.log(err)
    }

    // Limpar os campos do formulário
    if (productRef.current) productRef.current.value = ''
    if (colorRef.current) colorRef.current.value = ''
    if (memoryRef.current) memoryRef.current.value = ''
    if (storageRef.current) storageRef.current.value = ''
    if (priceRef.current) priceRef.current.value = ''
  }

  const handleDelete = useCallback(async (id: string) => {
    try {
      await api.delete(`/products/${id}`)

      setProducts(allProducts =>
        allProducts.filter(product => product.id !== id)
      )
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <>
      <div className="w-full min-h-screen bg-neutral-800 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="text-4xl font-medium text-white">
            Cadastro de Produtos
          </h1>

          <form className="flex flex-col my-6" onSubmit={handleSubmit}>
            <label className="font-medium text-white">Nome do produto:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Ex: MacBook Air M2"
              ref={productRef}
            />

            <label className="font-medium text-white">Memória:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Ex: 16 GB"
              ref={memoryRef}
            />
            <label className="font-medium text-white">Armazenamento:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Ex: 512 GB"
              ref={storageRef}
            />
            <label className="font-medium text-white">Cor:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="text"
              placeholder="Ex: Midnight"
              ref={colorRef}
            />
            <label className="font-medium text-white">Preço:</label>
            <input
              className="w-full mb-5 p-2 rounded bg-white"
              type="number"
              placeholder="Ex: R$ 7.800,00"
              ref={priceRef}
            />

            <input
              type="submit"
              value="Cadastrar"
              className="cursor-pointer w-full p-2 bg-green-500 rounded text-white font-medium"
            />
          </form>

          <section className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium text-white">
              Produtos Cadastrados
            </h2>
            <h3 className="text-green-500 font-bold">
              Total de produtos: {totalProducts}
            </h3>
            {products.map(product => (
              <article
                key={product.id}
                className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200"
              >
                <p>
                  <span className="font-medium">Nome: </span>
                  {product.productName}
                </p>
                <p>
                  <span className="font-medium">Memória: </span>
                  {product.memory}
                </p>
                <p>
                  <span className="font-medium">Armazenamento: </span>
                  {product.storage}
                </p>
                <p>
                  <span className="font-medium">Cor: </span>
                  {product.color}
                </p>
                <p>
                  <span className="font-medium">Preço: </span>
                  {product.price}
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
