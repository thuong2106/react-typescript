export type Product = {
  id: string
  title: string
  brand: string
  thumbnail: string // khi làm update và add new chỉ cần là 1 ô input người duùng nhập url ảnh
  description: string
  price: string
}

export type ProductFormValue = {
  title: string
  description: string
  thumbnail: string
  brand: string
  price: string
}
