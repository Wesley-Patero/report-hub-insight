
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import LoginForm from '../components/LoginForm';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import ReportCard from '../components/ReportCard';
import { reports } from '../data/mockData';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';

const Index = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReports, setFilteredReports] = useState(reports);

  useEffect(() => {
    if (searchTerm) {
      const filtered = reports.filter(
        report => 
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredReports(filtered);
    } else {
      setFilteredReports(reports);
    }
  }, [searchTerm]);

  if (!user) {
    return <LoginForm />;
  }

  const featuredReports = filteredReports.filter(report => report.isFeatured);
  const tipOfDayReport = filteredReports.find(report => report.isTipOfDay);
  const recentReports = [...filteredReports].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 6);

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64">
          <NavBar onSearchChange={setSearchTerm} />
          
          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Bem-vindo, {user.name}</h1>
              <p className="text-muted-foreground">Acesse os relatórios e acompanhe os indicadores</p>
            </div>
            
            {tipOfDayReport && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Dica do Dia</h2>
                </div>
                <div className="grid grid-cols-1">
                  <ReportCard report={tipOfDayReport} />
                </div>
              </div>
            )}
            
            <Tabs defaultValue="featured" className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Explorar Relatórios</h2>
                <TabsList>
                  <TabsTrigger value="featured">Destaques</TabsTrigger>
                  <TabsTrigger value="recent">Recentes</TabsTrigger>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="featured">
                {featuredReports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredReports.map(report => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Nenhum relatório em destaque encontrado.
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="recent">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentReports.map(report => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="all">
                {filteredReports.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredReports.map(report => (
                      <ReportCard key={report.id} report={report} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    Nenhum relatório encontrado.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </FavoritesProvider>
  );
};

export default Index;
