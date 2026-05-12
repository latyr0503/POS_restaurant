interface OrderSuccessProps {
  image: string
  title: string
  description: string
}
export default function OrderSuccess({ image, title, description }: OrderSuccessProps) {
  return (
    <div className="flex h-screen flex-1 flex-col items-center justify-center bg-white">
      <img src={image} alt={title} className="w-96" />

      <h2 className="mt-6 text-2xl font-extrabold text-black">{title} </h2>
      <p className="mt-2 text-sm text-gray-400">{description}</p>
    </div>
  )
}
