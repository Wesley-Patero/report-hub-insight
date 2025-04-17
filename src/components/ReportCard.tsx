
import { Link } from 'react-router-dom';
import { Report } from '../data/mockData';
import { useFavorites } from '../contexts/FavoritesContext';
import { Star, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ReportCardProps {
  report: Report;
}

const ReportCard = ({ report }: ReportCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(report.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin + '/reports/' + report.id);
    toast.success('Link copiado para a área de transferência');
  };

  return (
    <div className="report-card">
      {report.isFeatured && <span className="featured-badge">Destaque</span>}
      {report.isTipOfDay && <span className="tip-badge">Dica do Dia</span>}
      
      <Link to={`/reports/${report.id}`} className="block">
        <div className="aspect-video bg-gray-200 relative overflow-hidden">
          <img 
            src={report.thumbnailUrl} 
            alt={report.title} 
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold line-clamp-1">{report.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{report.description}</p>
            </div>
          </div>
          
          <div className="mt-3 flex items-center text-xs text-muted-foreground">
            <span className="bg-primary/10 text-primary rounded-full px-2 py-1">{report.category}</span>
            <span className="mx-2">•</span>
            <span>{new Date(report.createdAt).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0 flex justify-between">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => toggleFavorite(report.id)}
          className={cn(favorite ? "text-amber-500" : "text-muted-foreground")}
        >
          <Star className={cn("h-5 w-5", favorite && "fill-amber-500")} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleShare}
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ReportCard;
