import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { queryClient } from './lib/queryClient';
import { Sidebar } from './components/Sidebar';
import { OrdersPage } from './pages/OrdersPage';
import { ManagersPage } from './pages/ManagersPage';
import { ContractorsPage } from './pages/ContractorsPage';
import { AgentsPage } from './pages/AgentsPage';
import { ClientsPage } from './pages/ClientsPage';
import { CountriesPage } from './pages/CountriesPage';
import { SubagentsPage } from './pages/SubagentsPage';
import { SubagentPayersPage } from './pages/SubagentPayersPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 transition-all duration-300 ml-20 lg:ml-64 p-8">
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/orders" replace />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/managers" element={<ManagersPage />} />
                <Route path="/contractors" element={<ContractorsPage />} />
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/clients" element={<ClientsPage />} />
                <Route path="/countries" element={<CountriesPage />} />
                <Route path="/subagents" element={<SubagentsPage />} />
                <Route path="/subagent-payers" element={<SubagentPayersPage />} />
              </Routes>
            </div>
          </main>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;