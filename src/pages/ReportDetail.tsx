
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FavoritesProvider, useFavorites } from '../contexts/FavoritesContext';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import { reports } from '../data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Share2, Calendar, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const ReportDetailContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const report = reports.find(r => r.id === id);
  const favorite = report ? isFavorite(report.id) : false;
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copiado para a área de transferência');
  };
  
  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <h2 className="text-2xl font-bold mb-4">Relatório não encontrado</h2>
        <Button onClick={() => navigate('/reports')}>Voltar para Relatórios</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{report.title}</h1>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(report.createdAt).toLocaleDateString('pt-BR')}</span>
              <span className="mx-2">•</span>
              <span className="bg-primary/10 text-primary rounded-full px-2 py-1">{report.category}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => toggleFavorite(report.id)}
              className={cn(favorite ? "bg-amber-50 border-amber-300" : "")}
            >
              <Star className={cn(
                "h-4 w-4 mr-2", 
                favorite ? "fill-amber-500 text-amber-500" : ""
              )} />
              {favorite ? "Favoritado" : "Favoritar"}
            </Button>
            
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
        
        <p className="text-lg mb-6">{report.description}</p>
        
        {report.tags.length > 0 && (
          <div className="flex items-center mb-6">
            <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {report.tags.map(tag => (
                <span 
                  key={tag} 
                  className="bg-secondary text-secondary-foreground text-xs rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-8">
        <div className="border-b px-4 py-3 bg-muted/30 flex items-center justify-between">
          <h3 className="font-medium">Visualização do Relatório</h3>
          <Button variant="ghost" size="sm">
            Abrir em Tela Cheia
          </Button>
        </div>
        
        <div className="aspect-[16/9] w-full bg-muted/20 flex items-center justify-center p-4">
          <iframe 
            src={report.embedUrl}
            title={report.title}
            className="w-full h-full border-0" 
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const ReportDetail = () => {
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
            <ReportDetailContent />
          </main>
        </div>
      </div>
    </FavoritesProvider>
  );
};

export default ReportDetail;
