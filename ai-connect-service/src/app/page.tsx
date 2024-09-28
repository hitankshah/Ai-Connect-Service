  'use client';

  import { useState, useEffect } from 'react';
  import { Button } from "@/components/ui/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
  import { ScrollArea } from "@/components/ui/scroll-area";
  import { ChevronDown, ExternalLink, Menu, X } from 'lucide-react';
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
    const [selectedService] = useState<string | null>(null);
    const [searchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedLinks, setSelectedLinks] = useState<{ name: string; url: string; preview: string }[]>([]);
    const [editingService, setEditingService] = useState<{ id: string; name: string } | null>(null);
    const [newServiceName, setNewServiceName] = useState('');

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
    
    

    const filteredServices = services.filter(service =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.links.some(link => link.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    function handleLinkClick(url: string): void {
      throw new Error('Function not implemented.');
    }

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

        {/* Service List */}
     <ScrollArea className="flex-grow">
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => searchTerm(e.target.value)}
    placeholder="Search services..."
    className="p-2 rounded bg-gray-200 mb-4"
  />
  {filteredServices.map((service) => (
    <div key={service.id} className="mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="flex justify-between w-full text-left text-white bg-gray-700 hover:bg-gray-600"
          >
            <span>{service.icon} {isSidebarOpen && service.name}</span>
            <ChevronDown className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {service.links.map(link => (
            <DropdownMenuItem asChild key={link.url}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex justify-between w-full">
                <span>{link.name}</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ))}
</ScrollArea>
    </aside>

    {/* Main Content */}
    <main className="flex-grow p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Service Dashboard</h1>
        {selectedLinks.length > 0 && (
          <Button onClick={handleCloseDialog} className="bg-red-500 text-white">
            Clear Links
          </Button>
        )}
      </div>

      {/* Selected Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedLinks.map((link) => (
          <div key={link.url} className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">{link.name}</h3>
            <p className="text-sm text-gray-600">{link.preview}</p>
            <Button
              variant="link"
              onClick={() => handleLinkClick(link.url)}
              className="mt-2 text-blue-500"
            >
              Visit
            </Button>
          </div>
        ))}
      </div>
    </main>

    {/* Bottom Toolbar */}
    <BottomToolbar />
  </div>
    )}