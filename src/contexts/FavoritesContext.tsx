
import React, { createContext, useContext, useState, useEffect } from 'react';
import { userFavorites } from '../data/mockData';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (reportId: string) => void;
  isFavorite: (reportId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      // In a real app, fetch favorites from API
      // For demo, use mock data
      const userFavs = userFavorites[user.id as keyof typeof userFavorites] || [];
      setFavorites(userFavs);
    } else {
      setFavorites([]);
    }
  }, [user]);

  const toggleFavorite = (reportId: string) => {
    if (!user) {
      toast.error('Você precisa estar logado para favoritar relatórios');
      return;
    }

    const newFavorites = favorites.includes(reportId)
      ? favorites.filter(id => id !== reportId)
      : [...favorites, reportId];
    
    setFavorites(newFavorites);
    
    // In a real app, update favorites in API
    // For demo, just show a toast
    if (newFavorites.includes(reportId)) {
      toast.success('Relatório adicionado aos favoritos');
    } else {
      toast.info('Relatório removido dos favoritos');
    }
  };

  const isFavorite = (reportId: string): boolean => {
    return favorites.includes(reportId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
