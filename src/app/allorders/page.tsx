import getOrders from "@/checkoutActions/getOrders.action";
import getMyId from "@/utilities/getMyId";

export default async function AllOrders() {
  async function getUserOrders() {
    const id = await getMyId();
    if (id) {
      let res = await getOrders();
      console.log(res);
      return res.json();
    }
  }
  let orders = await getUserOrders();
  console.log(orders);

  return (
    <div className="mx-auto mt-50">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Number
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Delivered?
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order._id}
                  </th>
                  <td className="px-6 py-4">{order.totalOrderPrice}</td>
                  <td className="px-6 py-4">{order.paymentMethodType}</td>
                  <td className="px-6 py-4">{order.isDelivered?"YES":"NO"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
