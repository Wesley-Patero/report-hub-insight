
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from '../../components/Sidebar';
import NavBar from '../../components/NavBar';
import { reports, categories } from '../../data/mockData';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Pencil, 
  Trash2, 
  Star, 
  LightbulbOff, 
  LightbulbIcon, 
  StarOff,
  Plus,
  SearchIcon,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const AdminReports = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [reportsList, setReportsList] = useState(reports);
  
  if (!user || !isAdmin) {
    navigate('/');
    return null;
  }
  
  const filteredReports = reportsList.filter(
    report => 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleFeatureToggle = (reportId: string) => {
    setReportsList(prevReports => 
      prevReports.map(report => 
        report.id === reportId 
          ? { ...report, isFeatured: !report.isFeatured }
          : report
      )
    );
    toast.success('Status de destaque atualizado com sucesso');
  };
  
  const handleTipOfDayToggle = (reportId: string) => {
    // First, unmark all reports as tip of the day
    const updatedReports = reportsList.map(report => ({
      ...report,
      isTipOfDay: false
    }));
    
    // Then mark the selected one (or leave all unmarked if the currently marked one was clicked)
    const currentReport = reportsList.find(r => r.id === reportId);
    if (currentReport && !currentReport.isTipOfDay) {
      updatedReports.find(r => r.id === reportId)!.isTipOfDay = true;
    }
    
    setReportsList(updatedReports);
    toast.success('Dica do dia atualizada com sucesso');
  };
  
  const handleDeleteReport = (reportId: string) => {
    setReportsList(prevReports => 
      prevReports.filter(report => report.id !== reportId)
    );
    toast.success('Relatório excluído com sucesso');
  };
  
  const addNewReport = (reportData: Partial<typeof reports[0]>) => {
    const newReport = {
      id: String(Date.now()),
      title: reportData.title || 'Novo Relatório',
      description: reportData.description || '',
      category: reportData.category || 'finance',
      embedUrl: reportData.embedUrl || '',
      createdAt: new Date().toISOString().split('T')[0],
      createdBy: user.id,
      isFeatured: reportData.isFeatured || false,
      isTipOfDay: reportData.isTipOfDay || false,
      tags: reportData.tags || [],
      thumbnailUrl: 'https://via.placeholder.com/300x200?text=Novo',
    };
    
    setReportsList(prev => [newReport, ...prev]);
    toast.success('Relatório adicionado com sucesso');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <NavBar />
        
        <main className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Gerenciar Relatórios</h1>
              <p className="text-muted-foreground">Adicione, edite ou remova relatórios do sistema</p>
            </div>
            
            <NewReportDialog onAddReport={addNewReport} />
          </div>
          
          <div className="mb-6 flex items-center">
            <div className="relative flex-1 max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar relatórios..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-4 text-sm text-muted-foreground">
              {filteredReports.length} de {reportsList.length} relatórios
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead>Dica do Dia</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length > 0 ? (
                  filteredReports.map(report => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.title}</TableCell>
                      <TableCell>
                        {categories.find(c => c.id === report.category)?.name || report.category}
                      </TableCell>
                      <TableCell>{new Date(report.createdAt).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost"
                          size="icon"
                          onClick={() => handleFeatureToggle(report.id)}
                          className={report.isFeatured ? "text-amber-500" : ""}
                        >
                          {report.isFeatured 
                            ? <Star className="h-4 w-4 fill-amber-500" /> 
                            : <StarOff className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost"
                          size="icon"
                          onClick={() => handleTipOfDayToggle(report.id)}
                          className={report.isTipOfDay ? "text-amber-500" : ""}
                        >
                          {report.isTipOfDay 
                            ? <LightbulbIcon className="h-4 w-4 fill-amber-500" /> 
                            : <LightbulbOff className="h-4 w-4" />}
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o relatório "{report.title}"? Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteReport(report.id)}>
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Nenhum relatório encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

interface NewReportDialogProps {
  onAddReport: (reportData: Partial<typeof reports[0]>) => void;
}

const NewReportDialog = ({ onAddReport }: NewReportDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'finance',
    embedUrl: '',
    isFeatured: false,
    isTipOfDay: false,
    tags: '',
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReport({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
    });
    setOpen(false);
    setFormData({
      title: '',
      description: '',
      category: 'finance',
      embedUrl: '',
      isFeatured: false,
      isTipOfDay: false,
      tags: '',
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Relatório
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Relatório</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do novo relatório.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                name="category"
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="embedUrl">URL de Incorporação do Power BI</Label>
              <Input
                id="embedUrl"
                name="embedUrl"
                value={formData.embedUrl}
                onChange={handleChange}
                required
                placeholder="https://app.powerbi.com/reportEmbed?reportId=..."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="financeiro, vendas, trimestral"
              />
            </div>
            
            <div className="flex items-center space-x-8 pt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onCheckedChange={(checked) => handleSwitchChange('isFeatured', checked)}
                />
                <Label htmlFor="isFeatured">Destaque</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="isTipOfDay"
                  checked={formData.isTipOfDay}
                  onCheckedChange={(checked) => handleSwitchChange('isTipOfDay', checked)}
                />
                <Label htmlFor="isTipOfDay">Dica do Dia</Label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="submit">Adicionar Relatório</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminReports;
