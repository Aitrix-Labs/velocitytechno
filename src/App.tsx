import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import {
  BlogPage,
  CareersPage,
  CompanyPage,
  ContactPage,
  LegalPage,
  ProductPage,
  ProductsPage,
  ResourcesPage,
  SolutionPage,
  SolutionsPage,
} from './pages/SitePages'

export default function App() {
  return (
    <BrowserRouter basename="/velocitytechno">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="solutions/:slug" element={<SolutionPage />} />
          <Route path="company/careers" element={<CareersPage />} />
          <Route path="company/:slug" element={<CompanyPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy" element={<LegalPage kind="privacy" />} />
          <Route path="terms" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
