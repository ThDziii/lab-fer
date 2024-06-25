import React from 'react'
import { Route, Routes } from "react-router-dom";
import { routes } from '.';
import HomePage from '../pages/homePage';
import Product from '../pages/product';
import DetailOrchid from '../components/detailOrchid';
import ContactPage from '../pages/contactPage';
import FormPage from '../pages/formPage';
import ListOrchid from '../admin/page/listOrchid';
import LoginPage from '../pages/loginPage';


export default function AppRoute() {
  return (
    <Routes>
      <Route path={routes.home} element={<HomePage />} />
      <Route path={routes.product} element={<Product />} />
      {/* <Route path='/users' element={<ListUser />} /> */}
      <Route path={routes.orchidList} element={<ListOrchid/>}/>
      <Route path={`${routes.detail}/:id`} element={<DetailOrchid />} />
      <Route path={routes.contact} element={<ContactPage/>}/>
      <Route path={routes.form} element={<FormPage/>}/>
      <Route path={routes.login} element={<LoginPage/>}/>
    </Routes>
  )
}
