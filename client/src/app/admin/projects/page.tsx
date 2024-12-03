import AdminCategory from '@/components/AdminCategory'
import React from 'react'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AdminProject from '@/components/AdminProject';

export default function page() {
  return (
    <div>
         <>
         <DefaultLayout>
        <AdminCategory/>
        <AdminProject/>
        </DefaultLayout>
        </>
    </div>
  )
}
