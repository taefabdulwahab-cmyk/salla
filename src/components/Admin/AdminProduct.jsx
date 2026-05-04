import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/API";
import ProductGrid from "../home/ProductGrid";
export default function AdminProduct() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await API.get("/products");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <p className="text-3xl mb-5">Products {data?.products?.length}</p>

      <ProductGrid products={data?.products} />
    </div>
  );
}
