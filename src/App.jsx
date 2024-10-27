import AppRoutes from './routes';
import Footer from './components/footer';

function App() {

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App
