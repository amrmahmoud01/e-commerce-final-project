import getMyToken from "@/utilities/getMyToken";
import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

export default async function getCart() {
  const token = await getMyToken();

  let res = await axios("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token },
  });
  return res;
}
