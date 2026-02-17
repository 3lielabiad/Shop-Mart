
import Link from 'next/link'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ShoppingCartIcon, UserIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import LogOut from '../LogOut/LogOut'
import CartIcon from '../CartIcon/CartIcon'
import { CartRes } from '@/interfaces/CartInterfaces'


export default async function Navbar() {

  const session = await getServerSession(authOptions);
  
  let data: CartRes | null = null
  if (session?.token){
     
    try {
  
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
          headers:{
              token: session.token
            }
          })
          if (response.ok){
            data = await response.json()
          }else{data = null}
          
        } catch (err){
          data = null
        }
  }


  return <>

    <nav className="bg-white shadow py-4 px-25">
      <div className="container mx-auto  font-semibold flex flex-col md:flex-row items-start md:items-center justify-between">


        <h2 className="text-2xl">
          <Link href={'/'}>ShopMart</Link>
        </h2>
        <div className="">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className=''>
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className=''>
                  <Link href="/brands">brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className=''>
                  <Link href="/categories">categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="">
          <NavigationMenu>
            <NavigationMenuList>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <UserIcon className="size-6" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    {session ? <>

                      <Link href={'/profile'}>
                        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                      </Link>
                      <Link href={'/allorders'}>
                        <DropdownMenuItem className="cursor-pointer">MyOrders</DropdownMenuItem>
                      </Link>
                      <LogOut />

                    </> : <>

                      <Link href={'/login'}>
                        <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
                      </Link>
                      <Link href={'/register'}>
                        <DropdownMenuItem className="cursor-pointer">Register</DropdownMenuItem>
                      </Link>
                    </>}

                  </DropdownMenuGroup>

                </DropdownMenuContent>
              </DropdownMenu>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className=''>
                  {session && data &&<CartIcon serverCartNum={data?.numOfCartItems} cartId={data?.data?.cartOwner} />}
                </NavigationMenuLink>
              </NavigationMenuItem>


            </NavigationMenuList>
          </NavigationMenu>
        </div>

      </div>
    </nav>
  </>
}
