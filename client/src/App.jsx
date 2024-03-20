import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/shared/Layout'
import Data from './pages/Data'
import Dashboard from './pages/Dashboard'
import Input from './pages/Input'
import UpdateData from './components/UpdateData'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="input" element={<Input />} />
                    <Route path="data" element={<Data />} />
                    <Route path="data/:id" element={<UpdateData />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
