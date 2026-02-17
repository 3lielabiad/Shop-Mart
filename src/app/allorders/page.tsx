"use client"

import { useEffect } from "react";

export default function AllOrders() {

  async function getOrders() {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+ localStorage.getItem('cartId'))
    const data = await response.json();
  }
useEffect(()=> {
  getOrders()
})
  return <>
    <div>Allorders</div>
  </>
  
}
