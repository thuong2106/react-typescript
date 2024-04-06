import { useQuery } from '@tanstack/react-query'
import { deleteProduct, getProducts } from '@/services/product'
import { Table, Button, Modal, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductListPage() {
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const result = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  const products = result.data || []

  const loading = result.isLoading

  console.log(products)

  const handleClickBtnDelete = (productId: string) => {
    setSelectedProductId(productId)
    setOpenModalConfirm(true)
  }

  // Function to handle product deletion
  const handleDeleteProduct = async () => {
    try {
      if (selectedProductId) {
        await deleteProduct(selectedProductId)
        result.refetch()
      }
      setOpenModalConfirm(false)
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div className='m-3'>
      <h2>Product List Page</h2>
      <div className='d-flex justify-content-end mt-3'>
        <Link to={'/admin/products/create'}>
          <Button>Add+</Button>
        </Link>
      </div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.title}</td>
                  <td>
                    <img src={product.thumbnail} />
                  </td>
                  <td>{product.description}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className='product_table_action'>
                      <Link to={`/admin/products/${product.id}`}>
                        <Button variant='secondary'>Edit</Button>
                      </Link>
                      <Button variant='danger' onClick={() => handleClickBtnDelete(product.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <Modal show={openModalConfirm} onHide={() => setOpenModalConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Warning!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setOpenModalConfirm(false)}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleDeleteProduct}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
