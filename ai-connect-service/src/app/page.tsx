'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ExternalLink, Menu, Settings, X, Edit, Trash2 } from 'lucide-react';
import BottomToolbar from '@/components/ui/bottomtoolbar';

const initialServices = [
  {
    id: 'ai',
    name: 'AI',
    icon: '🤖',
    links: [
      { name: 'OpenAI', url: 'https://www.openai.com/', preview: 'OpenAI - AI tools and models.' },
      { name: 'Google AI', url: 'https://ai.google/', preview: 'Google AI - Innovative AI research.' },
      { name: 'IBM Watson', url: 'https://www.ibm.com/watson', preview: 'IBM Watson - AI for business.' },
      { name: 'Microsoft Azure AI', url: 'https://azure.microsoft.com/en-us/services/cognitive-services/', preview: 'Microsoft Azure AI - Cloud AI services.' },
      { name: 'Hugging Face', url: 'https://huggingface.co/', preview: 'Hugging Face - AI models and datasets.' },
    ],
  },
  {
    id: 'dev-community',
    name: 'Dev Community',
    icon: '👥',
    links: [
      { name: 'GitHub', url: 'https://github.com/', preview: 'GitHub - Collaborative coding platform.' },
      { name: 'Stack Overflow', url: 'https://stackoverflow.com/', preview: 'Stack Overflow - Programming Q&A site.' },
      { name: 'Dev.to', url: 'https://dev.to/', preview: 'Dev.to - Community for software developers.' },
      { name: 'Reddit - Programming', url: 'https://www.reddit.com/r/programming/', preview: 'Reddit - Programming discussions.' },
      { name: 'Hashnode', url: 'https://hashnode.com/', preview: 'Hashnode - Blogging platform for developers.' },
    ],
  },
  {
    id: 'cloud',
    name: 'Cloud Platforms',
    icon: '☁️',
    links: [
      { name: 'AWS', url: 'https://aws.amazon.com/', preview: 'AWS - Scalable cloud computing services.' },
      { name: 'Microsoft Azure', url: 'https://azure.microsoft.com/', preview: 'Microsoft Azure - Cloud services for building, testing, and managing apps.' },
      { name: 'Google Cloud', url: 'https://cloud.google.com/', preview: 'Google Cloud - Secure cloud services and infrastructure.' },
      { name: 'IBM Cloud', url: 'https://www.ibm.com/cloud', preview: 'IBM Cloud - Full-stack cloud platform.' },
      { name: 'Oracle Cloud', url: 'https://www.oracle.com/cloud/', preview: 'Oracle Cloud - Enterprise cloud solutions.' },
    ],
  },
  {
    id: 'dev-tools',
    name: 'Development Tools',
    icon: '🛠️',
    links: [
      { name: 'Visual Studio Code', url: 'https://vscode.dev/', preview: 'VS Code - Free source-code editor.' },
      { name: 'GitLab', url: 'https://gitlab.com/', preview: 'GitLab - Version control and CI/CD platform.' },
      { name: 'Docker', url: 'https://www.docker.com/', preview: 'Docker - Containerization platform.' },
      { name: 'Jenkins', url: 'https://www.jenkins.io/', preview: 'Jenkins - Automation server for CI/CD.' },
      { name: 'CircleCI', url: 'https://circleci.com/', preview: 'CircleCI - Continuous integration and delivery platform.' },
    ],
  },
  {
    id: 'design',
    name: 'Design Tools',
    icon: '🎨',
    links: [
      { name: 'Figma', url: 'https://www.figma.com/', preview: 'Figma - Collaborative design tool.' },
      { name: 'Adobe XD', url: 'https://www.adobe.com/products/xd.html', preview: 'Adobe XD - UI/UX design and prototyping tool.' },
      { name: 'Sketch', url: 'https://www.sketch.com/', preview: 'Sketch - Digital design toolkit.' },
      { name: 'Canva', url: 'https://www.canva.com/', preview: 'Canva - Graphic design and content creation tool.' },
      { name: 'InVision', url: 'https://www.invisionapp.com/', preview: 'InVision - Digital product design platform.' },
    ],
  },
  {
    id: 'learning',
    name: 'Learning Platforms',
    icon: '📚',
    links: [
      { name: 'Coursera', url: 'https://www.coursera.org/', preview: 'Coursera - Online courses from top universities.' },
      { name: 'Udemy', url: 'https://www.udemy.com/', preview: 'Udemy - Online learning platform.' },
      { name: 'edX', url: 'https://www.edx.org/', preview: 'edX - Free online courses by leading institutions.' },
      { name: 'Khan Academy', url: 'https://www.khanacademy.org/', preview: 'Khan Academy - Free educational resources.' },
      { name: 'Pluralsight', url: 'https://www.pluralsight.com/', preview: 'Pluralsight - Technology skill development platform.' },
    ],
  },
  {
    id: 'data',
    name: 'Data Science',
    icon: '📊',
    links: [
      { name: 'Kaggle', url: 'https://www.kaggle.com/', preview: 'Kaggle - Data science and machine learning competitions.' },
      { name: 'DataCamp', url: 'https://www.datacamp.com/', preview: 'DataCamp - Learn data science and analytics online.' },
      { name: 'Tableau', url: 'https://www.tableau.com/', preview: 'Tableau - Visual analytics platform.' },
      { name: 'Google BigQuery', url: 'https://cloud.google.com/bigquery', preview: 'Google BigQuery - Serverless, scalable data warehouse.' },
      { name: 'Apache Spark', url: 'https://spark.apache.org/', preview: 'Apache Spark - Unified analytics engine for big data.' },
    ],
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: '🚀',
    links: [
      { name: 'Notion', url: 'https://www.notion.so/', preview: 'Notion - All-in-one workspace for notes, tasks, databases.' },
      { name: 'Trello', url: 'https://trello.com/', preview: 'Trello - Task management and collaboration tool.' },
      { name: 'Asana', url: 'https://asana.com/', preview: 'Asana - Project management software for teams.' },
      { name: 'Slack', url: 'https://slack.com/', preview: 'Slack - Team collaboration and communication.' },
      { name: 'Monday.com', url: 'https://monday.com/', preview: 'Monday.com - Work management platform.' },
    ],
  },
  {
    id: 'security',
    name: 'Cybersecurity',
    icon: '🔒',
    links: [
      { name: 'OWASP', url: 'https://owasp.org/', preview: 'OWASP - Open Web Application Security Project.' },
      { name: 'Kali Linux', url: 'https://www.kali.org/', preview: 'Kali Linux - Penetration testing platform.' },
      { name: 'Nmap', url: 'https://nmap.org/', preview: 'Nmap - Network mapping and vulnerability scanner.' },
      { name: 'Wireshark', url: 'https://www.wireshark.org/', preview: 'Wireshark - Network protocol analyzer.' },
      { name: 'Tenable', url: 'https://www.tenable.com/', preview: 'Tenable - Vulnerability management and cyber exposure.' },
    ],
  },
  {
    id: 'blockchain',
    name: 'Blockchain',
    icon: '🔗',
    links: [
      { name: 'Ethereum', url: 'https://ethereum.org/', preview: 'Ethereum - Decentralized platform for smart contracts.' },
      { name: 'Bitcoin', url: 'https://bitcoin.org/', preview: 'Bitcoin - Digital currency and payment system.' },
      { name: 'Solana', url: 'https://solana.com/', preview: 'Solana - High-performance blockchain.' },
      { name: 'Polkadot', url: 'https://polkadot.network/', preview: 'Polkadot - Interoperable blockchain network.' },
      { name: 'Binance Smart Chain', url: 'https://www.binance.org/en/smartChain', preview: 'Binance Smart Chain - EVM compatible blockchain.' },
    ],
  },
  {
    id: 'streaming',
    name: 'Streaming Services',
    icon: '📺',
    links: [
      { name: 'Netflix', url: 'https://www.netflix.com/', preview: 'Netflix - Streaming movies and TV shows.' },
      { name: 'JioCinema', url: 'https://www.jiocinema.com/', preview: 'JioCinema - Indian streaming service for movies and TV shows.' },
      { name: 'Amazon Prime Video', url: 'https://www.primevideo.com/', preview: 'Amazon Prime Video - Streaming service with a vast library of content.' },
      { name: 'Hotstar', url: 'https://www.hotstar.com/', preview: 'Hotstar - Indian streaming platform for sports, movies, and TV shows.' },
      { name: 'SonyLiv', url: 'https://www.sonyliv.com/', preview: 'SonyLiv - Streaming service for Indian TV shows, movies, and sports.' },
    ],
  },
];

export default function AIServicesDashboard() {
  const [services, setServices] = useState(initialServices);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<{ name: string; url: string; preview: string }[]>([]);
  const [editingService, setEditingService] = useState<{ id: string; name: string } | null>(null);
  const [newServiceName, setNewServiceName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedService) {
      const service = services.find(s => s.id === selectedService);
      if (service) {
        setSelectedLinks(service.links);
      }
    } else {
      setSelectedLinks([]);
    }
  }, [selectedService, services]);

  const handleOpenDialog = (service: { id: string; name: string }) => {
    setEditingService(service);
    setNewServiceName(service.name);
  };

  const handleCloseDialog = () => {
    setEditingService(null);
    setNewServiceName('');
  };

  const handleUpdateServiceName = () => {
    if (editingService) {
      setServices(services.map(service =>
        service.id === editingService.id ? { ...service, name: newServiceName } : service
      ));
      handleCloseDialog();
    }
  };

  const handleLinkClick = (url: string) => {
    try {
      window.open(url, '_blank');
    } catch (err) {
      console.error(err);
      setError("Error opening link. Please try again.");
    }
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.links.some(link => link.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`flex-shrink-0 ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out overflow-hidden bg-gray-800 text-white p-4`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className={`${isSidebarOpen ? 'block' : 'hidden'} text-2xl font-bold`}>Services</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Search Input */}
        {isSidebarOpen && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded"
            />
          </div>
        )}

        {/* Service List */}
        <ScrollArea className="flex-grow">
          {filteredServices.map((service) => (
            <DropdownMenu key={service.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full flex justify-between items-center">
                  <span className="text-lg">{service.icon} {isSidebarOpen ? service.name : ''}</span>
                  <ChevronDown className={`${isSidebarOpen ? 'block' : 'hidden'} h-5 w-5`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {service.links.map((link) => (
                  <DropdownMenuItem key={link.url} onClick={() => handleLinkClick(link.url)}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    <span>{link.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-4">AI Services Dashboard</h1>
        <div>
          {selectedService && selectedLinks.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-2">Links for {services.find(service => service.id === selectedService)?.name}</h2>
              <ul className="space-y-2">
                {selectedLinks.map(link => (
                  <li key={link.url} className="flex items-center justify-between">
                    <div>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {link.name}
                      </a>
                      <p className="text-gray-500">{link.preview}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Select a service to view its links.</p>
          )}
        </div>
      </main>

      {/* Edit Service Dialog */}
      <Dialog open={!!editingService} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service Name</DialogTitle>
          </DialogHeader>
          <Input
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            className="w-full px-4 py-2 mb-4"
          />
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleUpdateServiceName}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Toolbar */}
      <BottomToolbar />
    </div>
  );
}
