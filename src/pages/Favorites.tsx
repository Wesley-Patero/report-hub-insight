
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FavoritesProvider, useFavorites } from '../contexts/FavoritesContext';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import ReportCard from '../components/ReportCard';
import { reports } from '../data/mockData';

const FavoritesContent = () => {
  const { favorites } = useFavorites();
  const [favoriteReports, setFavoriteReports] = useState([]);
  
  useEffect(() => {
    const filteredReports = reports.filter(report => favorites.includes(report.id));
    setFavoriteReports(filteredReports);
  }, [favorites]);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Meus Favoritos</h1>
        <p className="text-muted-foreground">Relatórios que você marcou como favorito</p>
      </div>
      
      {favoriteReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {favoriteReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg bg-card">
          <h3 className="text-xl font-medium mb-2">Sem favoritos ainda</h3>
          <p className="text-muted-foreground mb-6">
            Você ainda não marcou nenhum relatório como favorito.
          </p>
        </div>
      )}
    </div>
  );
};

const Favorites = () => {
  const { user } = useAuth();
  
  if (!user) {
    return null;
  }
  
  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64">
          <NavBar />
          
          <main className="p-6">
            <FavoritesContent />
          </main>
        </div>
      </div>
    </FavoritesProvider>
  );
};

export default Favorites;
