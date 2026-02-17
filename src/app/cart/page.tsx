
import { authOptions } from '@/auth'
import Cart from '@/components/Cart/Cart';
import { getServerSession } from 'next-auth'
import Product from '../products/page';
import { CartRes } from '@/interfaces/CartInterfaces';




export default async function CartPage() {


    const session = await getServerSession(authOptions);

    if (!session) return <Cart cartData={null}/>;

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        headers:{
            token: session.token as string
        },
        cache: "no-store"}
      );
    if (!response.ok) return < Cart cartData={null}/>;

    const data: CartRes = await response.json();

  return <>
    <Cart cartData={ data.numOfCartItems === 0 ? null : data} />
  </>
}